#!/usr/bin/python3

import re
import datetime
import json
import pandas
import shutil


DLES_FILE = "../lib/data/dles.json"
DLES_FILE_OLD = "../lib/data/dles.json.old"
DLES_METADATA_FILE = "../lib/data/dles_metadata.json"
NEW_DLES_FILE = "../lib/data/new_dles.json"
CHANGELOG_JSON = "../lib/data/changelog.json"
CHANGELOG_MD = "../../CHANGELOG.md"
README_MD = "../../README.md"


def sort_dles():
    backup_file(DLES_FILE)

    dles = read_dles()
    dles.sort(key=lambda d: d["name"].lower())
    write_dles(dles)


def sort_new_dles():
    backup_file(DLES_FILE)

    dles = read_new_dles()
    dles.sort(key=lambda d: d["name"].lower())
    write_new_dles(dles)


def backup_file(f, extension=".bak"):
    shutil.copy(f, f"{f}{extension}")


def read_dles():
    with open(DLES_FILE, "r") as f:
        return json.loads(f.read())


def write_dles(d):
    with open(DLES_FILE, "w+") as f:
        f.write(json.dumps(d, indent=2))


def read_old_dles():
    with open(DLES_FILE_OLD, "r") as f:
        return json.loads(f.read())


def read_new_dles():
    with open(NEW_DLES_FILE, "r") as f:
        return json.loads(f.read())


def write_new_dles(d):
    with open(NEW_DLES_FILE, "w+") as f:
        f.write(json.dumps(d, indent=2))


def compare_dles_to_old_dles(d1, d2):
    new_dles = []
    for dle in d1:
        for old_dle in d2:
            if dle["name"] == old_dle["name"]:
                break
        else:
            new_dles.append({
                "name": dle["name"],
                "url": dle["url"],
            })

    removed_dles = []
    for old_dle in d2:
        for dle in d1:
            if old_dle["name"] == dle["name"]:
                break
        else:
            removed_dles.append({
                "name": old_dle["name"],
                "url": old_dle["url"],
            })

    return {
        "new": new_dles, "removed": removed_dles
    }


def current_date():
    return datetime.datetime.now().strftime("%Y-%m-%d")


def add_changes_to_changelog():
    changes = compare_dles_to_old_dles(read_dles(), read_old_dles())
    print(changes)

    current_dles = read_dles()
    current_dle_names = {dle["name"] for dle in current_dles}
    new_dles = changes["new"]
    removed_dles = changes["removed"]

    if not (new_dles or removed_dles):
        print("No changes to add to changelog")
        return

    date = current_date()
    changelog_json = read_changelog()

    entry = next((e for e in changelog_json if e["date"] == date), None)
    if not entry:
        entry = {"date": date, "dles added": [], "dles removed": []}
        changelog_json.insert(0, entry)
    print(entry)

    entry.setdefault("dles added", [])
    entry.setdefault("dles removed", [])

    entry["dles added"].extend(new_dles)
    entry["dles removed"].extend(removed_dles)

    # Clean up non-existent dles from current entry
    cleaned_added = [dle for dle in entry["dles added"]
                     if dle["name"] in current_dle_names]
    # Keep removed dles as historical record
    cleaned_removed = entry["dles removed"]

    if len(cleaned_added) != len(entry["dles added"]):
        print(
            f"Cleaned {len(entry['dles added']) - len(cleaned_added)} non-existent dles from changelog")

    entry["dles added"] = cleaned_added
    entry["dles removed"] = cleaned_removed

    duplicates = {"added": [], "removed": []}

    for dle_list, key, dup_key in [(new_dles, "dles added", "added"), (removed_dles, "dles removed", "removed")]:
        for dle in dle_list:
            if any(entry[key][i]["url"] == dle["url"] for i in range(len(entry[key]))):
                duplicates[dup_key].append(dle)

    if not entry["dles added"] and not entry["dles removed"]:
        print("No actual changes made - all items were duplicates")
        return

    # Check if there's an existing description and prepend to it
    add_remove_description = create_add_remove_description(
        entry["dles added"], entry["dles removed"])
    if "description" in entry and entry["description"]:
        existing_description = entry["description"]
        existing_description = re.sub(
            r'Add \d+ dles?\. ', '', existing_description)
        existing_description = re.sub(
            r'Remove \d+ dles?\. ', '', existing_description)
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

    for dup_type, dup_list in duplicates.items():
        if dup_list:
            print(
                f"Duplicate dles tried to be {dup_type} ({len(dup_list)}): {', '.join(dle['name'] for dle in dup_list)}")

    backup_file(DLES_FILE, ".old")


def read_changelog():
    with open(CHANGELOG_JSON, 'r') as f:
        return json.loads(f.read())


def changelog_dles_to_markdown_table(dles):
    for dle in dles:
        name = dle["name"]
        url = dle["url"]
        dle["name"] = f"[{name}]({url})"
        dle["url"] = f"[{url}]({url})"

    df = pandas.DataFrame.from_dict(dles)
    df.index = df.index + 1

    return df.to_markdown(index=True)


def last_update_date():
    changelog_json = read_changelog()
    return changelog_json[0]["date"]


def create_add_remove_description(dles_added, dles_removed):
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
    changelog_md_str = changelog_json_to_md_str()
    with open(CHANGELOG_MD, "w+") as f:
        f.write(changelog_md_str)


def dles_to_markdown_table():
    dles = read_dles()

    for dle in dles:
        name = dle["name"]
        url = dle["url"]
        dle["name"] = f"[{name}]({url})"

    df = pandas.DataFrame.from_dict(dles)
    df.drop(['url'], axis=1, inplace=True)
    df.drop(['id'], axis=1, inplace=True)
    df.index = df.index + 1

    return df.to_markdown(index=True)


def write_dles_to_readme_md():
    list_header_str = "## Current list of dles"

    with open(README_MD, 'r') as f:
        before_list_header_str = f.read().split(list_header_str)[0]

    with open(README_MD, 'w') as f:
        f.write(before_list_header_str)
        f.write(list_header_str)
        f.write("\n\n")
        f.write(f"**Last updated `{last_update_date(
        )}`** ([view changelog](https://github.com/aukspot/dles/blob/main/CHANGELOG.md))")
        f.write("\n\n")
        f.write(dles_to_markdown_table())


def update_new_dles_from_changelog(days_threshold=31):
    changelog_json = read_changelog()

    threshold_date = datetime.datetime.now() - datetime.timedelta(days=days_threshold)
    threshold_date_str = threshold_date.strftime("%Y-%m-%d")

    print(
        f"Looking for changelog entries from {threshold_date_str} onwards...")

    recent_dles = []
    entries_processed = 0

    for entry in changelog_json:
        entry_date = datetime.datetime.strptime(entry["date"], "%Y-%m-%d")

        if entry_date >= threshold_date:
            entries_processed += 1
            print(f"Processing entry from {entry['date']}...")

            if "dles added" in entry and isinstance(entry["dles added"], list):
                print(f"  Found {len(entry['dles added'])} dles added")
                recent_dles.extend(entry["dles added"])

    print(f"Processed {entries_processed} changelog entries")
    print(
        f"Found {len(recent_dles)} total dles from the past {days_threshold} days")

    unique_dles = []
    seen_urls = set()

    for dle in recent_dles:
        if dle["url"] not in seen_urls:
            seen_urls.add(dle["url"])
            unique_dles.append({
                "name": dle["name"],
                "url": dle["url"]
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
    with open(DLES_METADATA_FILE, "r") as f:
        return json.load(f)


def get_max_id():
    metadata = read_metadata()
    return int(metadata["max_id"])


def write_metadata(key, value):
    metadata = read_metadata()
    metadata[key] = value
    with open(DLES_METADATA_FILE, "w") as f:
        f.write(json.dumps(metadata, indent=2))


def add_ids_to_dles():
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
