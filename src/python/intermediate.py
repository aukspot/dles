#!/usr/bin/python3

import re
import datetime
import json
import pandas
import shutil


SPONSORS_FILE = "../lib/data/sponsors.json"
DLES_FILE = "../lib/data/dles.json"
DLES_FILE_OLD = "../lib/data/dles.json.old"
DLES_METADATA_FILE = "../lib/data/dles_metadata.json"
NEW_DLES_FILE = "../lib/data/new_dles.json"
REMOVED_DLES_FILE = "../lib/data/removed_dles.json"
CHANGELOG_JSON = "../lib/data/changelog.json"
CHANGELOG_MD = "../../CHANGELOG.md"
README_MD = "../../README.md"


def sort_dles():
    """Sort dles.json alphabetically by name."""
    backup_file(DLES_FILE)

    dles = read_dles()
    dles.sort(key=lambda d: d["name"].lower())
    write_dles(dles)


def sort_new_dles():
    """Sort new_dles.json alphabetically by name."""
    backup_file(DLES_FILE)

    dles = read_new_dles()
    dles.sort(key=lambda d: d["name"].lower())
    write_new_dles(dles)


def backup_file(f, extension=".bak"):
    """Create a backup copy of a file with the given extension."""
    shutil.copy(f, f"{f}{extension}")


def read_dles():
    """Read and return the current dles list from dles.json."""
    with open(DLES_FILE, "r") as f:
        return json.loads(f.read())


def write_dles(d):
    """Write the dles list to dles.json."""
    with open(DLES_FILE, "w+") as f:
        f.write(json.dumps(d, indent=2))


def read_old_dles():
    """Read and return the previous dles list from dles.json.old."""
    with open(DLES_FILE_OLD, "r") as f:
        return json.loads(f.read())


def read_removed_dles():
    """Read and return the removed dles list from removed_dles.json. Returns [] if file doesn't exist."""
    try:
        with open(REMOVED_DLES_FILE, "r") as f:
            return json.loads(f.read())
    except FileNotFoundError:
        return []


def write_removed_dles(d):
    """Write the removed dles list to removed_dles.json."""
    with open(REMOVED_DLES_FILE, "w+") as f:
        f.write(json.dumps(d, indent=2))


def read_new_dles():
    """Read and return the new dles list from new_dles.json."""
    with open(NEW_DLES_FILE, "r") as f:
        return json.loads(f.read())


def write_new_dles(d):
    """Write the new dles list to new_dles.json."""
    with open(NEW_DLES_FILE, "w+") as f:
        f.write(json.dumps(d, indent=2))


def compare_dles_to_old_dles(d1, d2):
    """Compare dles by ID to find new and removed dles."""
    current_ids = {dle["id"] for dle in d1 if "id" in dle}
    old_ids = {dle["id"] for dle in d2 if "id" in dle}

    new_dles = [
        {"name": dle["name"], "url": dle["url"], "id": dle["id"]}
        for dle in d1
        if "id" in dle and dle["id"] not in old_ids
    ]

    removed_dles = [
        {"name": dle["name"], "url": dle["url"], "id": dle["id"]}
        for dle in d2
        if "id" in dle and dle["id"] not in current_ids
    ]

    return {"new": new_dles, "removed": removed_dles}


def current_date():
    """Return today's date as a YYYY-MM-DD string."""
    return datetime.datetime.now().strftime("%Y-%m-%d")


def add_changes_to_changelog():
    """Detect added/removed dles by comparing dles.json to dles.json.old, then update changelog.json and removed_dles.json."""
    current_dles = read_dles()
    old_dles = read_old_dles()
    changes = compare_dles_to_old_dles(current_dles, old_dles)
    print(changes)

    current_ids = {dle["id"] for dle in current_dles if "id" in dle}
    new_dles = changes["new"]
    removed_dles = changes["removed"]

    if not (new_dles or removed_dles):
        print("No changes to add to changelog")
        return

    # Track removed and re-added dles
    previously_removed_ids = {d["id"] for d in read_removed_dles() if "id" in d}
    readded_dles = [d for d in new_dles if d["id"] in previously_removed_ids]
    update_removed_dles(removed_dles, readded_dles, old_dles)

    date = current_date()
    changelog_json = read_changelog()

    entry = next((e for e in changelog_json if e["date"] == date), None)
    if not entry:
        entry = {"date": date, "dles added": [], "dles removed": []}
        changelog_json.insert(0, entry)
    print(entry)

    entry.setdefault("dles added", [])
    entry.setdefault("dles removed", [])

    # Get existing IDs in this entry to avoid duplicates
    existing_added_ids = {dle["id"] for dle in entry["dles added"] if "id" in dle}
    existing_removed_ids = {dle["id"] for dle in entry["dles removed"] if "id" in dle}

    # Add new dles (skip duplicates)
    duplicates_added = []
    for dle in new_dles:
        if dle["id"] in existing_added_ids:
            duplicates_added.append(dle)
        else:
            entry["dles added"].append(dle)
            existing_added_ids.add(dle["id"])

    # Add removed dles (skip duplicates)
    duplicates_removed = []
    for dle in removed_dles:
        if dle["id"] in existing_removed_ids:
            duplicates_removed.append(dle)
        else:
            entry["dles removed"].append(dle)
            existing_removed_ids.add(dle["id"])

    # Clean up: remove from "dles added" any that no longer exist in current dles
    original_added_count = len(entry["dles added"])
    entry["dles added"] = [dle for dle in entry["dles added"] if dle.get("id") in current_ids]
    if len(entry["dles added"]) != original_added_count:
        print(f"Cleaned {original_added_count - len(entry['dles added'])} non-existent dles from changelog")

    if not entry["dles added"] and not entry["dles removed"]:
        print("No actual changes made")
        return

    # Update description
    add_remove_description = create_add_remove_description(
        entry["dles added"], entry["dles removed"])
    if "description" in entry and entry["description"]:
        existing_description = entry["description"]
        existing_description = re.sub(r'Add \d+ dles?\. ', '', existing_description)
        existing_description = re.sub(r'Remove \d+ dles?\. ', '', existing_description)
        entry["description"] = add_remove_description + existing_description
    else:
        entry["description"] = add_remove_description

    if len(entry["dles added"]) == 0:
        del entry["dles added"]

    if len(entry["dles removed"]) == 0:
        del entry["dles removed"]

    backup_file(CHANGELOG_JSON)
    with open(CHANGELOG_JSON, "w+") as f:
        f.write(json.dumps(changelog_json, indent=2))

    if duplicates_added:
        print(f"Duplicate dles tried to be added ({len(duplicates_added)}): {', '.join(dle['name'] for dle in duplicates_added)}")
    if duplicates_removed:
        print(f"Duplicate dles tried to be removed ({len(duplicates_removed)}): {', '.join(dle['name'] for dle in duplicates_removed)}")

    backup_file(DLES_FILE, ".old")


def read_changelog():
    """Read and return the changelog from changelog.json."""
    with open(CHANGELOG_JSON, 'r') as f:
        return json.loads(f.read())


def changelog_dles_to_markdown_table(dles):
    """Convert a list of dles to a markdown table with linked names and urls."""
    for dle in dles:
        name = dle["name"]
        url = dle["url"]
        dle["name"] = f"[{name}]({url})"
        dle["url"] = f"[{url}]({url})"

    df = pandas.DataFrame.from_dict(dles)
    df.index = df.index + 1

    return df.to_markdown(index=True)


def last_update_date():
    """Return the date of the most recent changelog entry."""
    changelog_json = read_changelog()
    return changelog_json[0]["date"]


def create_add_remove_description(dles_added, dles_removed):
    """Generate a description string like 'Add 3 dles. Remove 1 dle.' from the given lists."""
    if not dles_added:
        dles_added = []
    if not dles_removed:
        dles_removed = []
    dles_added_count = len(dles_added)
    dles_removed_count = len(dles_removed)
    description = ""
    plural_added = "s" if dles_added_count > 1 or dles_added_count == 0 else ""
    plural_removed = "s" if dles_removed_count > 1 or dles_removed_count == 0 else ""
    if dles_added_count > 0:
        description += f"Add {dles_added_count} dle{plural_added}. "
    if dles_removed_count > 0:
        description += f"Remove {dles_removed_count} dle{plural_removed}. "
    return description


def changelog_json_to_md_str():
    """Convert changelog.json to a markdown string for CHANGELOG.md."""
    changelog_json = read_changelog()

    result = "# Changelog - The Dles\n\n"

    for day in changelog_json:
        result += f"## {day['date']}\n\n"

        if "suggestion form</a>" in day['description']:
            day['description'] = day['description'].replace(
                "/suggest", "https://tally.so/r/mOKOea")

        if "form to report a bug.</a>" in day['description']:
            day['description'] = day['description'].replace(
                "/report", "https://tally.so/r/wQpPpY")

        result += f"{day['description']}\n\n"

        if "dles added" in day:
            result += "dles added: \n"
            result += changelog_dles_to_markdown_table(day["dles added"])
            result += "\n"

        result += "\n"

        if "dles removed" in day:
            result += "dles removed: \n"
            result += changelog_dles_to_markdown_table(day["dles removed"])
            result += "\n"

    return result


def create_changelog_md():
    """Generate CHANGELOG.md from changelog.json."""
    changelog_md_str = changelog_json_to_md_str()
    with open(CHANGELOG_MD, "w+") as f:
        f.write(changelog_md_str)


def read_sponsors():
    """Read and return the sponsors list from sponsors.json."""
    with open(SPONSORS_FILE, "r") as f:
        return json.loads(f.read())

CATEGORY_ORDER = [
    "Card/Board Games",
    "Colors",
    "Estimation",
    "Food",
    "Geography",
    "History",
    "Math/Logic",
    "Movies/TV",
    "Music",
    "Science/Nature",
    "Shapes/Patterns",
    "Sports",
    "Trivia",
    "Vehicles",
    "Video Games",
    "Miscellaneous",
    "Words",
]


def dles_to_categorized_markdown():
    """Convert the current dles list to a categorized bullet-point markdown string."""
    dles = read_dles()
    sponsor_ids = {s["id"] for s in read_sponsors()}

    # Group dles by category
    categories = {}
    for dle in dles:
        cat = dle.get("category", "Miscellaneous")
        categories.setdefault(cat, []).append(dle)

    result = ""

    # Sponsors section at the top
    sponsor_dles = [d for d in dles if d["id"] in sponsor_ids]
    sponsor_dles.sort(key=lambda d: d["name"].lower())
    if sponsor_dles:
        result += "### Sponsors\n\n"
        for dle in sponsor_dles:
            result += f"- [{dle['name']}]({dle['url']}) - {dle.get('description', '')}\n"
        result += "\n"

    # Categories in defined order
    for cat in CATEGORY_ORDER:
        if cat not in categories:
            continue
        cat_dles = sorted(categories[cat], key=lambda d: d["name"].lower())
        result += f"### {cat} ({len(cat_dles)})\n\n"
        for dle in cat_dles:
            result += f"- [{dle['name']}]({dle['url']}) - {dle.get('description', '')}\n"
        result += "\n"

    # Any remaining categories not in the defined order
    for cat in sorted(categories.keys()):
        if cat not in CATEGORY_ORDER:
            cat_dles = sorted(categories[cat], key=lambda d: d["name"].lower())
            result += f"### {cat} ({len(cat_dles)})\n\n"
            for dle in cat_dles:
                result += f"- [{dle['name']}]({dle['url']}) - {dle.get('description', '')}\n"
            result += "\n"

    return result.rstrip() + "\n"


def write_dles_to_readme_md():
    """Update README.md with the current categorized dles list and last update date."""
    list_header_str = "## Current list of dles"

    with open(README_MD, 'r') as f:
        before_list_header_str = f.read().split(list_header_str)[0]

    with open(README_MD, 'w') as f:
        f.write(before_list_header_str)
        f.write(list_header_str)
        f.write("\n\n")
        f.write(f"**Last updated `{last_update_date()}`** ([view changelog](https://github.com/aukspot/dles/blob/main/CHANGELOG.md))")
        f.write("\n\n")
        f.write(dles_to_categorized_markdown())


def get_previously_removed_dle_ids(changelog_json):
    """Get a set of IDs for all dles that were ever removed."""
    removed_ids = set()

    for entry in changelog_json:
        if "dles removed" in entry and isinstance(entry["dles removed"], list):
            for dle in entry["dles removed"]:
                if "id" in dle:
                    removed_ids.add(dle["id"])

    return removed_ids


def update_removed_dles(removed_dles_changes, readded_dles_changes, old_dles):
    """Update removed_dles.json when dles are removed or re-added.

    Args:
        removed_dles_changes: list of dles that were just removed (from compare_dles_to_old_dles)
        readded_dles_changes: list of dles that were just re-added (from compare_dles_to_old_dles)
        old_dles: full dle data from dles.json.old (has description, category, etc.)
    """
    removed_dles_data = read_removed_dles()
    date = current_date()

    # Build lookup by id for quick access
    removed_dles_by_id = {d["id"]: d for d in removed_dles_data if "id" in d}
    old_dles_by_id = {d["id"]: d for d in old_dles if "id" in d}

    # Handle removals
    for dle in removed_dles_changes:
        dle_id = dle["id"]
        full_data = old_dles_by_id.get(dle_id, {})

        if dle_id in removed_dles_by_id:
            # Dle was removed before - update data and add new removal entry
            entry = removed_dles_by_id[dle_id]
            # Update fields to reflect latest state
            for key in ["name", "url", "description", "category", "theme"]:
                if key in full_data:
                    entry[key] = full_data[key]
                elif key in entry and key not in full_data:
                    del entry[key]
            entry["removals"].append({"date_removed": date})
        else:
            # First time removal - create new entry
            entry = {
                "name": full_data.get("name", dle["name"]),
                "url": full_data.get("url", dle["url"]),
                "id": dle_id,
                "removals": [{"date_removed": date}]
            }
            for key in ["description", "category", "theme"]:
                if key in full_data:
                    entry[key] = full_data[key]
            removed_dles_data.append(entry)
            removed_dles_by_id[dle_id] = entry

        print(f"  Tracked removal: {entry['name']} (id: {dle_id})")

    # Handle re-additions
    for dle in readded_dles_changes:
        dle_id = dle["id"]
        if dle_id in removed_dles_by_id:
            entry = removed_dles_by_id[dle_id]
            # Find the most recent removal without a date_readded
            for removal in reversed(entry["removals"]):
                if "date_readded" not in removal:
                    removal["date_readded"] = date
                    print(f"  Tracked re-addition: {entry['name']} (id: {dle_id})")
                    break

    # Sort by name for consistency
    removed_dles_data.sort(key=lambda d: d.get("name", "").lower())
    write_removed_dles(removed_dles_data)
    print(f"Updated {REMOVED_DLES_FILE} ({len(removed_dles_data)} entries)")


def update_new_dles_from_changelog(days_threshold=31):
    """Rebuild new_dles.json from changelog entries within the past days_threshold days, excluding re-added dles."""
    changelog_json = read_changelog()

    threshold_date = datetime.datetime.now() - datetime.timedelta(days=days_threshold)
    threshold_date_str = threshold_date.strftime("%Y-%m-%d")

    print(
        f"Looking for changelog entries from {threshold_date_str} onwards...")

    # Get all previously removed dle IDs to exclude re-added ones
    removed_ids = get_previously_removed_dle_ids(changelog_json)
    print(f"Found {len(removed_ids)} previously removed dle IDs to exclude if re-added")

    recent_dles = []
    entries_processed = 0
    readded_count = 0

    for entry in changelog_json:
        entry_date = datetime.datetime.strptime(entry["date"], "%Y-%m-%d")

        if entry_date >= threshold_date:
            entries_processed += 1
            print(f"Processing entry from {entry['date']}...")

            if "dles added" in entry and isinstance(entry["dles added"], list):
                print(f"  Found {len(entry['dles added'])} dles added")
                for dle in entry["dles added"]:
                    # Skip dles that were previously removed (re-added dles)
                    dle_id = dle.get("id")
                    if dle_id and dle_id in removed_ids:
                        readded_count += 1
                        print(f"    Skipping re-added dle: {dle['name']} (id: {dle_id})")
                        continue
                    # Include the date from the changelog entry
                    dle_with_date = {**dle, "date_added": entry["date"]}
                    recent_dles.append(dle_with_date)

    print(f"Processed {entries_processed} changelog entries")
    print(f"Skipped {readded_count} re-added dles")
    print(
        f"Found {len(recent_dles)} total dles from the past {days_threshold} days")

    unique_dles = []
    seen_urls = set()

    for dle in recent_dles:
        if dle["url"] not in seen_urls:
            seen_urls.add(dle["url"])
            unique_dles.append({
                "name": dle["name"],
                "url": dle["url"],
                "id": dle["id"],
                "date_added": dle["date_added"]
            })

    print(f"After removing duplicates: {len(unique_dles)} unique dles")

    unique_dles.sort(key=lambda d: d["name"].lower())

    backup_file(NEW_DLES_FILE)
    write_new_dles(unique_dles)

    print(f"Successfully updated {NEW_DLES_FILE}")
    print(f"New dles list contains {len(unique_dles)} games")

    if unique_dles:
        print("\nFirst few entries:")
        for i, dle in enumerate(unique_dles[:5]):
            print(f"  {i + 1}. {dle['name']} - {dle['url']}")

        if len(unique_dles) > 5:
            print(f"  ... and {len(unique_dles) - 5} more")

    return unique_dles


def read_metadata():
    """Read and return the metadata from dles_metadata.json."""
    with open(DLES_METADATA_FILE, "r") as f:
        return json.load(f)


def get_max_id():
    """Return the current max dle ID from metadata."""
    metadata = read_metadata()
    return int(metadata["max_id"])


def write_metadata(key, value):
    """Update a key-value pair in dles_metadata.json."""
    metadata = read_metadata()
    metadata[key] = value
    with open(DLES_METADATA_FILE, "w") as f:
        f.write(json.dumps(metadata, indent=2))


def add_ids_to_dles():
    """Assign sequential IDs to any dles in dles.json that don't have one yet."""
    dles = read_dles()
    max_id = get_max_id()
    i = max_id + 1
    for dle in dles:
        if "id" not in dle:
            dle["id"] = i
            i += 1
    if i - 1 > max_id:
        write_metadata("max_id", i - 1)
    write_dles(dles)


if __name__ == "__main__":
    # add_new_dles_to_changelog()
    # add_changes_to_changelog()
    # update_new_dles_from_changelog(17)
    pass
