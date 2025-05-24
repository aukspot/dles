#!/usr/bin/python3

import datetime
import json, os
import pandas
import shutil
import string

import pandas

from colour import Color


DLES_FILE = "../lib/data/dles.json"
TAG_COLORS_FILE = "../lib/data/tag_colors.json"
CHANGELOG_JSON = "../lib/data/changelog.json"
CHANGELOG_MD = "../../CHANGELOG.md"
README_MD = "../../README.md"


def add_ids_to_dles():
    dles = read_dles()
    
    # Check if IDs already exist
    filled_with_ids = True
    for dle in dles:
        if 'id' not in dle:
            filled_with_ids = False
            break

    if filled_with_ids:
        print("IDs already exist in the file. Skipping...")
        return True
    
    # Add IDs
    i = get_next_available_id()
    for dle in dles:
        if 'id' not in dle:
            dle['id'] = i
            i += 1
    
    # Backup dles
    backup_file(DLES_FILE)

    # Write the updated JSON
    try:
        write_dles(dles)
        return True
    except Exception as e:
        print(f"Error writing file: {e}")
        return False


def get_next_available_id():
    dles = read_dles()
    max_id = max(dle.get('id', 0) for dle in dles)
    return max_id + 1


def try_add_ids_to_dles():
    success = add_ids_to_dles()
    if success:
        print("\nExample playlist URLs:")
        print("First 5 games: ?playlist=1,2,3,4,5")
        print("Random selection: ?playlist=1,15,42,100,200")
        print("Single game: ?playlist=73")
        
        next_id = get_next_available_id()
        print(f"\nNext available ID for new games: {next_id}")
    else:
        print("Failed to add IDs. Please check the errors above.")


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


def backup_file(f):
  shutil.copy(f, f"{f}.bak")


def read_dles():
  with open(DLES_FILE, "r") as f:
    return json.loads(f.read())


def write_dles(d):
  with open(DLES_FILE, "w+") as f:
    f.write(json.dumps(d, indent=2))


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


def changelog_json_to_md_str():
  changelog_json = read_changelog()

  result = "# Changelog - The Dles\n\n"

  for day in changelog_json:
    result += f"## {day['date']}\n\n"

    if "suggestion form</a>" in day['description']:
      day['description'] = day['description'].replace("/suggest", "https://dles.aukspot.com/suggest")

    if "form to report a bug.</a>" in day['description']:
      day['description'] = day['description'].replace("/report", "https://dles.aukspot.com/report")


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
    f.write(f"**Last updated `{last_update_date()}`** ([view changelog](https://github.com/aukspot/dles/blob/main/CHANGELOG.md))")
    f.write("\n\n")
    f.write(dles_to_markdown_table())


if __name__ == "__main__":
    # add_new_dles_to_changelog()
    # add_changes_to_changelog()
    try_add_ids_to_dles()
    pass
