#! /usr/bin/env python3
"""Split dles.json and removed_dles.json into one YAML file per game.

The YAML files become the source of truth; dles.json is regenerated from them.
Games that were removed and later re-added exist in both JSON files and are
merged into a single YAML file with a combined history.

Usage:
    python split_to_yaml.py           # write YAML files
    python split_to_yaml.py --check   # regenerate JSON and diff, write nothing
"""

import json
import os
import re
import sys

import yaml

DLES_FILE = "../lib/data/dles.json"
REMOVED_DLES_FILE = "../lib/data/removed_dles.json"
CHANGELOG_FILE = "../lib/data/changelog.json"
OUT_DIR = "../../data/dles"

# Two games were renumbered off the early M-prefixed scheme, so the changelog
# records their addition under an id neither dles.json nor removed_dles.json
# uses any more. Matched by name and url in the changelog.
ID_ALIASES = {
    53: "M23",    # Circuits, added 2024-06-22 as circuitsgame.com
    387: "M25",   # The Wikipedia Game / The Wiki Game Daily, added 2024-05-28
}

# Field order in the emitted YAML. Anything not listed is appended afterwards
# so unexpected fields survive a round trip instead of being silently dropped.
FIELD_ORDER = [
    "id",
    "name",
    "url",
    "description",
    "category",
    "theme",
    "tags",
    "status",
    "archive_url",
    "previous_urls",
    "history",
]

# Fields that dles.json carries, in the order the existing file uses.
JSON_FIELDS = ["name", "url", "description", "category", "theme", "id"]

# Fields that live only in the YAML files. Nothing in the JSON sources can
# reproduce them, so a regeneration copies them across from the existing file.
MANUAL_FIELDS = ["tags", "archive_url", "screenshot", "notes"]


def slugify(name):
    """Lowercase, hyphen-separated form of a game name, for filenames."""
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def filename_for(dle):
    """Build a collision-free filename. IDs are unique, so prefixing with the
    id disambiguates the nine games whose names slugify identically."""
    dle_id = dle["id"]
    prefix = f"{dle_id:04d}" if isinstance(dle_id, int) else str(dle_id)
    return f"{prefix}-{slugify(dle['name'])}.yaml"


def read_add_dates():
    """Map each dle id to the date it was first added, from the changelog.

    Entries are walked oldest first so the earliest addition wins; a later
    entry for the same id is a re-addition, which build_history already covers.
    """
    with open(CHANGELOG_FILE) as f:
        changelog = json.load(f)

    added = {}
    for entry in sorted(changelog, key=lambda e: e["date"]):
        for dle in entry.get("dles added", []):
            if "id" in dle:
                added.setdefault(dle["id"], entry["date"])

    for current_id, old_id in ID_ALIASES.items():
        if current_id not in added and old_id in added:
            added[current_id] = added[old_id]

    return added


def read_removal_reasons():
    """Map (id, date) to the removal reason recorded in the changelog.

    Removals from 2026 onwards record their reason in the changelog only, not
    in removed_dles.json, so the changelog is the fuller source. Reasons are
    keyed by date as well as id because a game can be removed more than once.
    """
    with open(CHANGELOG_FILE) as f:
        changelog = json.load(f)

    reasons = {}
    for entry in changelog:
        for dle in entry.get("dles removed", []):
            if "id" in dle and dle.get("reason"):
                reasons.setdefault((dle["id"], entry["date"]), dle["reason"])

    return reasons


def build_history(removed_entry, date_added=None, dle_id=None, reasons=None):
    """Flatten removals[] into a chronological event list.

    The nested {date_removed, reason, date_readded} shape makes "is it removed
    right now?" a backwards scan for a removal lacking a date_readded. A flat
    list answers that by looking at the last event.
    """
    reasons = reasons or {}
    history = []
    if date_added:
        history.append({"date": date_added, "event": "added"})

    for removal in removed_entry.get("removals", []):
        date = removal["date_removed"]
        event = {"date": date, "event": "removed"}
        # removed_dles.json wins when both carry a reason, since a hand edit
        # there is the more deliberate of the two.
        reason = removal.get("reason") or reasons.get((dle_id, date))
        if reason:
            event["reason"] = reason
        history.append(event)

        if "date_readded" in removal:
            history.append({"date": removal["date_readded"], "event": "readded"})

    # Stable sort: events already sit in causal order, so a same-day add and
    # removal keep the order they were appended in rather than swapping.
    history.sort(key=lambda e: e["date"])
    return history


def derive_status(history):
    """Default status from the last history event.

    "archived" (no new dailies, but the back catalogue is still playable)
    cannot be inferred from a removal reason, so it is set by hand after
    checking the site. Once set, the history carries an "archived" event and
    this maps it back, so re-running the split does not undo that judgement.
    """
    if history and history[-1]["event"] in ("removed", "archived"):
        return history[-1]["event"]
    return "active"


def merge(active, removed, date_added=None, reasons=None):
    """Combine the active and removed records for one game.

    Either side may be None. When both exist the game was removed and later
    re-added, so the active record holds the current field values and the
    removed record contributes the history plus, sometimes, an older URL.
    """
    base = dict(active) if active else dict(removed)
    base.pop("removals", None)

    dle_id = (active or removed)["id"]
    history = build_history(removed or {}, date_added, dle_id, reasons)

    # A removed record that predates a re-add can hold a URL the game has since
    # moved away from. That is the only URL history recorded anywhere today.
    previous_urls = []
    if active and removed:
        old_url = removed.get("url")
        if old_url and old_url != active.get("url"):
            readds = [e for e in history if e["event"] == "readded"]
            previous_urls.append(
                {
                    "url": old_url,
                    "until": readds[-1]["date"] if readds else history[-1]["date"],
                }
            )

    dle = {k: v for k, v in base.items() if v is not None}
    if previous_urls:
        dle["previous_urls"] = previous_urls
    if history:
        dle["history"] = history
    dle["status"] = derive_status(history)
    return dle


def ordered(dle):
    """Reorder keys so every file reads the same way top to bottom."""
    out = {k: dle[k] for k in FIELD_ORDER if k in dle}
    for k in sorted(dle):
        if k not in out:
            out[k] = dle[k]
    return out


def load_all():
    """Read both JSON files and merge them into one record per game."""
    with open(DLES_FILE) as f:
        active = json.load(f)
    with open(REMOVED_DLES_FILE) as f:
        removed = json.load(f)

    active_by_id = {d["id"]: d for d in active}
    removed_by_id = {d["id"]: d for d in removed}

    add_dates = read_add_dates()
    reasons = read_removal_reasons()

    dles = []
    for dle_id, dle in active_by_id.items():
        dles.append(
            merge(dle, removed_by_id.get(dle_id), add_dates.get(dle_id), reasons)
        )
    for dle_id, dle in removed_by_id.items():
        if dle_id not in active_by_id:
            dles.append(merge(None, dle, add_dates.get(dle_id), reasons))

    return active, dles


def to_json_record(dle):
    """Project a YAML record back down to the dles.json field set."""
    return {k: dle[k] for k in JSON_FIELDS if k in dle}


def preserve_manual_fields(dles):
    """Carry hand-set fields over from YAML files that already exist.

    The JSON sources only know active and removed, so regenerating would
    otherwise revert an "archived" judgement made by checking the site. Any
    field the JSON cannot express is restored from the file on disk.
    """
    if not os.path.isdir(OUT_DIR):
        return

    existing = {d["id"]: d for d in read_yaml_dir()}

    for dle in dles:
        prior = existing.get(dle["id"])
        if not prior:
            continue

        if prior.get("status") == "archived":
            dle["status"] = "archived"
            # Keep the terminal event in step with the status, so the two
            # cannot drift apart and derive_status stays correct.
            for event in dle.get("history", []):
                if event["event"] == "removed" and any(
                    p["event"] == "archived" and p["date"] == event["date"]
                    for p in prior.get("history", [])
                ):
                    event["event"] = "archived"

        for field in MANUAL_FIELDS:
            if field in prior and field not in dle:
                dle[field] = prior[field]


def write_yaml(dles):
    os.makedirs(OUT_DIR, exist_ok=True)
    for dle in dles:
        path = os.path.join(OUT_DIR, filename_for(dle))
        with open(path, "w") as f:
            yaml.safe_dump(
                ordered(dle),
                f,
                sort_keys=False,
                allow_unicode=True,
                default_flow_style=False,
                width=1000,
            )
    return len(dles)


def read_yaml_dir():
    """Load every YAML file back off disk.

    The check reads these rather than reusing the in-memory records, so that a
    serialisation bug or a file that never got written is caught rather than
    hidden behind logic that happens to agree with itself.
    """
    dles = []
    for name in sorted(os.listdir(OUT_DIR)):
        if name.endswith(".yaml"):
            with open(os.path.join(OUT_DIR, name)) as f:
                dles.append(yaml.safe_load(f))
    return dles


def check(original_active):
    """Regenerate dles.json from the YAML files on disk and compare.

    A clean result means the split lost nothing that the site currently reads.
    """
    dles = read_yaml_dir()
    # Archived games are kept out of dles.json alongside removed ones: the site
    # has no archived handling yet, so surfacing them would list games that no
    # longer have a puzzle today. Revisit when archived games get their own UI.
    rebuilt = [
        to_json_record(d) for d in dles if d.get("status") == "active"
    ]
    rebuilt.sort(key=lambda d: d["name"].lower())

    expected = sorted(original_active, key=lambda d: d["name"].lower())

    if rebuilt == expected:
        print(f"Round trip clean: {len(rebuilt)} active dles match dles.json exactly.")
        return True

    print(f"MISMATCH: rebuilt {len(rebuilt)} vs original {len(expected)}")
    by_id = {d["id"]: d for d in expected}
    for record in rebuilt:
        other = by_id.get(record["id"])
        if other != record:
            print(f"  id {record['id']}: {record} != {other}")
    return False


if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    original_active, dles = load_all()

    if "--check" in sys.argv:
        sys.exit(0 if check(original_active) else 1)

    preserve_manual_fields(dles)
    count = write_yaml(dles)
    print(f"Wrote {count} YAML files to {OUT_DIR}")

    statuses = {}
    for dle in dles:
        statuses[dle["status"]] = statuses.get(dle["status"], 0) + 1
    print(f"  status: {statuses}")
    print(f"  with history: {sum(1 for d in dles if 'history' in d)}")
    print(f"  with previous_urls: {sum(1 for d in dles if 'previous_urls' in d)}")

    check(original_active)
