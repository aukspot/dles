#!/usr/bin/python3

import datetime
import json
import pandas
import shutil
import string

from colour import Color


DLES_FILE = "../lib/data/dles.json"
DLES_FILE_OLD = "../lib/data/dles.json.old"
NEW_DLES_FILE = "../lib/data/new_dles.json"
TAG_COLORS_FILE = "../lib/data/tag_colors.json"
CHANGELOG_JSON = "../lib/data/changelog.json"
CHANGELOG_MD = "../../CHANGELOG.md"
README_MD = "../../README.md"


def sort_tags():
    backup_file(DLES_FILE)

    dles = read_dles()
    for dle in dles:
        dle["tags"].sort()
    write_dles(dles)


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
    new_dles = changes["new"]
    removed_dles = changes["removed"]
    new_dles_count = 0
    removed_dles_count = 0

    date = current_date()
    is_date_in_changelog = False
    changelog_json = read_changelog()
    duplicates_tried_to_add = []
    duplicates_tried_to_remove = []

    for entry in changelog_json:
        if entry["date"] == date:
            is_date_in_changelog = True
            if "dles added" in entry:
                for dle in new_dles:
                    if dle not in entry["dles added"]:
                        entry["dles added"].append(dle)
                        new_dles_count += 1
                    else:
                        duplicates_tried_to_add.append(dle)
            else:
                if len(new_dles) > 0:
                    entry["dles added"] = new_dles
                new_dles_count = len(new_dles)
            if "dles removed" in entry:
                for dle in removed_dles:
                    if dle not in entry["dles removed"]:
                        entry["dles removed"].append(dle)
                        removed_dles_count += 1
                    else:
                        duplicates_tried_to_remove.append(dle)
            else:
                if len(removed_dles) > 0:
                    entry["dles removed"] = removed_dles
                removed_dles_count = len(removed_dles)
            entry["description"] = get_changelog_description(
                len(entry["dles added"]), len(entry["dles removed"]))
            break

    if not is_date_in_changelog:
        changelog_json.insert(0, {
            "date": date,
            "dles added": new_dles,
            "dles removed": removed_dles,
            "description": get_changelog_description(len(new_dles), len(removed_dles))
        })

    if len(entry["dles added"]) > 0 or len(entry["dles removed"]) > 0:
        backup_file(CHANGELOG_JSON)
        with open(CHANGELOG_JSON, "w+") as f:
            f.write(json.dumps(changelog_json, indent=2))

        if is_date_in_changelog:
            print(f"Changelog updated for {date}: {
                changelog_json[0]['description']}")

        if duplicates_tried_to_add:
            print(f"Duplicate dles tried to be added ({len(duplicates_tried_to_add)}): {', '.join(
                dle['name'] for dle in duplicates_tried_to_add)}")
        if duplicates_tried_to_remove:
            print(f"Duplicate dles tried to be removed ({len(duplicates_tried_to_remove)}): {
                ', '.join(dle['name'] for dle in duplicates_tried_to_remove)}")

    if "dles added" in changelog_json[0]:
        write_new_dles(changelog_json[0]["dles added"])

    backup_file(DLES_FILE, extension=".old")


def extract_tags(dles):
    return list(set([
        tag for dle in dles
        for tag in dle["tags"]
    ]))


def word_to_color(word):
    color = ""
    letters = [c.lower() for c in word if c.lower() in string.ascii_lowercase]
    hue = sum(
        string.ascii_lowercase.index(letter) * 26 ** (len(letters) - i - 1)
        for i, letter in enumerate(letters)
    ) / 26 ** len(letters)

    color = Color(hue=hue)
    color.set_saturation(0.5)
    color.set_luminance(0.75)
    return color.hex


def create_tag_colors():
    backup_file(TAG_COLORS_FILE)

    dles = read_dles()
    tags = extract_tags(dles)
    tags.sort()
    tag_colors = {
        tag: word_to_color(tag)
        for tag in tags
    }

    with open(TAG_COLORS_FILE, "w+") as f:
        f.write(json.dumps(tag_colors, indent=2))


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


def get_changelog_description(dles_added_count, dles_removed_count):
    plural_added = "s" if dles_added_count > 1 or dles_added_count == 0 else ""
    plural_removed = "s" if dles_removed_count > 1 or dles_removed_count == 0 else ""
    return f"Add {dles_added_count} dle{plural_added}. Remove {dles_removed_count} dle{plural_removed}."


def changelog_json_to_md_str():
    changelog_json = read_changelog()

    result = "# Changelog - The Dles\n\n"

    for day in changelog_json:
        result += f"## {day['date']}\n\n"

        if "suggestion form</a>" in day['description']:
            day['description'] = day['description'].replace(
                "/suggest", "https://dles.aukspot.com/suggest")

        if "form to report a bug.</a>" in day['description']:
            day['description'] = day['description'].replace(
                "/report", "https://dles.aukspot.com/report")

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
    df.drop(['tags'], axis=1, inplace=True)
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


if __name__ == "__main__":
    # add_new_dles_to_changelog()
    add_changes_to_changelog()
    pass
