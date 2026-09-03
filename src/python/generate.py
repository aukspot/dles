import datetime
import json
import os
import re
import sys

import yaml

YAML_DIR = "../../data/dles"
DLES_FILE = "../lib/data/dles.json"
ARCHIVED_DLES_FILE = "../lib/data/archived_dles.json"
REMOVED_DLES_FILE = "../lib/data/removed_dles.json"
DLES_METADATA_FILE = "../lib/data/dles_metadata.json"

ACTIVE_FIELDS = ["name", "url", "description", "category", "themes", "id"]

FULL_FIELDS = [
    "id",
    "name",
    "url",
    "description",
    "category",
    "themes",
    "tags",
    "archive_url",
    "notes",
    "previous_urls",
    "history",
]

YAML_FIELD_ORDER = [
    "id",
    "name",
    "url",
    "description",
    "category",
    "themes",
    "tags",
    "status",
    "archive_url",
    "notes",
    "previous_urls",
    "history",
]


def slugify(name):
    """Lowercase, hyphen-separated form of a game name, for filenames."""
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def id_prefix(dle_id):
    """Zero-padded id prefix. Early games use M-prefixed ids, kept verbatim."""
    return f"{dle_id:04d}" if isinstance(dle_id, int) else str(dle_id)


def filename_for(dle):
    """The settled filename for a game that has an id."""
    return f"{id_prefix(dle['id'])}-{slugify(dle['name'])}.yaml"


def current_date():
    return datetime.datetime.now().strftime("%Y-%m-%d")


def read_metadata():
    with open(DLES_METADATA_FILE) as f:
        return json.load(f)


def write_metadata(metadata):
    with open(DLES_METADATA_FILE, "w") as f:
        f.write(json.dumps(metadata, indent=2))


def read_yaml_files():
    """Load every game, returning (filename, record) pairs in filename order."""
    games = []
    for name in sorted(os.listdir(YAML_DIR)):
        if not name.endswith(".yaml"):
            continue
        with open(os.path.join(YAML_DIR, name)) as f:
            games.append((name, yaml.safe_load(f)))
    return games


def split_out_drafts(games):
    """Hold back stubs that have not been filled in yet.

    new_dle.py writes a stub with empty fields. Until it has at least a name
    it cannot claim a filename or an id, so it is kept out of the build
    instead of registering as an unnamed game.
    """
    ready, drafts = [], []
    for filename, dle in games:
        if "id" not in dle and not (dle.get("name") or "").strip():
            drafts.append(filename)
        else:
            ready.append((filename, dle))
    return ready, drafts


def write_yaml(path, dle):
    """Write one game back out, with fields in the canonical order."""
    ordered = {k: dle[k] for k in YAML_FIELD_ORDER if k in dle}
    for key in sorted(dle):
        if key not in ordered:
            ordered[key] = dle[key]

    with open(path, "w") as f:
        yaml.safe_dump(
            ordered,
            f,
            sort_keys=False,
            allow_unicode=True,
            default_flow_style=False,
            width=1000,
        )


def check_duplicate_slugs(games):
    """Refuse to run when two games would claim the same filename.

    There are no collisions today, but two games sharing a name would silently
    overwrite each other, so this fails instead.
    """
    seen = {}
    clashes = []
    for filename, dle in games:
        slug = slugify(dle["name"])
        if slug in seen:
            clashes.append((slug, seen[slug], filename))
        seen[slug] = filename
    return clashes


STATUS_EVENTS = {
    "active": ("added", "readded"),
    "removed": ("removed",),
    "archived": ("archived",),
}


def record_status_changes(games, dry_run=False):
    recorded = []
    for filename, dle in games:
        if "id" not in dle:
            continue

        status = dle.get("status", "active")
        expected = STATUS_EVENTS.get(status)
        if not expected:
            continue

        history = dle.setdefault("history", [])
        last = history[-1]["event"] if history else None
        if last in expected:
            continue

        event = "readded" if status == "active" else expected[0]
        history.append({"date": current_date(), "event": event})
        recorded.append((dle["name"], status, event))

        if not dry_run:
            write_yaml(os.path.join(YAML_DIR, filename), dle)

    return recorded


def register_new_games(games, dry_run=False):
    """Assign ids and add dates to each game that does not have them yet.
    """
    metadata = read_metadata()
    next_id = int(metadata["max_id"]) + 1

    registered = []
    for index, (filename, dle) in enumerate(games):
        if "id" in dle:
            continue

        dle["id"] = next_id
        next_id += 1

        history = dle.setdefault("history", [])
        if not any(event["event"] == "added" for event in history):
            history.insert(0, {"date": current_date(), "event": "added"})

        dle.setdefault("status", "active")

        old_path = os.path.join(YAML_DIR, filename)
        new_name = filename_for(dle)
        new_path = os.path.join(YAML_DIR, new_name)
        registered.append((filename, new_name, dle["id"]))

        if not dry_run:
            write_yaml(old_path, dle)
            if new_name != filename:
                os.rename(old_path, new_path)
            games[index] = (new_name, dle)

    if registered and not dry_run:
        metadata["max_id"] = next_id - 1
        write_metadata(metadata)

    return registered


def project(dle, fields):
    return {k: dle[k] for k in fields if k in dle}


def write_json(path, records):
    with open(path, "w") as f:
        f.write(json.dumps(records, indent=2))


def build_outputs(games):
    """Split games by status into the three site-facing JSON files."""
    by_status = {"active": [], "archived": [], "removed": []}
    for _, dle in games:
        status = dle.get("status", "active")
        by_status.setdefault(status, []).append(dle)

    active = sorted(by_status["active"], key=lambda d: d["name"].lower())
    archived = sorted(by_status["archived"], key=lambda d: d["name"].lower())
    removed = sorted(by_status["removed"], key=lambda d: d["name"].lower())

    return {
        DLES_FILE: [project(d, ACTIVE_FIELDS) for d in active],
        ARCHIVED_DLES_FILE: [project(d, FULL_FIELDS) for d in archived],
        REMOVED_DLES_FILE: [project(d, FULL_FIELDS) for d in removed],
    }


def main(dry_run=False):
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    games = read_yaml_files()

    games, drafts = split_out_drafts(games)
    for filename in drafts:
        print(f"Skipping {filename}: no name yet")

    clashes = check_duplicate_slugs(games)
    if clashes:
        for slug, first, second in clashes:
            print(f"ERROR: '{slug}' claimed by both {first} and {second}")
        print("Rename one of the files, or give the games distinct names.")
        return 1

    registered = register_new_games(games, dry_run)
    for old_name, new_name, dle_id in registered:
        arrow = "would be" if dry_run else ""
        print(f"Registered id {dle_id}: {old_name} {arrow} -> {new_name}")

    recorded = record_status_changes(games, dry_run)
    for name, status, event in recorded:
        verb = "would record" if dry_run else "Recorded"
        print(f"{verb} {event} for {name} (status: {status})")

    outputs = build_outputs(games)

    for path, records in outputs.items():
        label = os.path.basename(path)
        if dry_run:
            existing = []
            if os.path.exists(path):
                with open(path) as f:
                    existing = json.load(f)
            state = "unchanged" if existing == records else "WOULD CHANGE"
            print(f"  {label}: {len(records)} entries ({state})")
        else:
            write_json(path, records)
            print(f"  {label}: {len(records)} entries")

    return 0


if __name__ == "__main__":
    sys.exit(main(dry_run="--check" in sys.argv))
