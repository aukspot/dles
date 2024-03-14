#!/usr/bin/python3

import json
import shutil
import string
from colour import Color


DLES_FILE = "../data/dles.json"
TAG_COLORS_FILE = "../data/tag_colors.json"
CHANGELOG_JSON = "../data/changelog.json"
CHANGELOG_MD = "../../CHANGELOG.md"

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

  # test
  color = Color(hue=hue)
  color.set_saturation(0.4)
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


def changelog_json_to_md_str():
  with open(CHANGELOG_JSON, 'r') as f:
    changelog_json = json.loads(f.read())

  result = "# Changelog - The Dles\n\n"

  for day in changelog_json:
    result += f"## {day['date']}\n\n"
    result += f"{day['description']}\n\n"

    if "dles added" in day:
      result += "dles added: "
      result += ", ".join(f"[{dle['name']}]({dle['url']})" for dle in day["dles added"])
      result += "\n"

    result += "\n"

    if "dles removed" in day:
      result += "dles removed: "
      result += ", ".join(f"[{dle['name']}]({dle['url']})" for dle in day["dles removed"])
      result += "\n"
    
  return result


def create_changelog_md():
  changelog_md_str = changelog_json_to_md_str()
  with open(CHANGELOG_MD, "w+") as f:
    f.write(changelog_md_str)


if __name__ == "__main__":
  changelog_json_to_md_str()
