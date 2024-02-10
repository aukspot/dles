#!/usr/bin/python3

import json
import shutil
import string
from colour import Color


DLES_FILE = "data/dles.json"
TAG_COLORS_FILE = "data/tag_colors.json"


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
  color.set_luminance(0.8)
  return color.hex


def create_tag_colors():
  backup_file(TAG_COLORS_FILE)

  dles = read_dles()
  tags = extract_tags(dles)
  tag_colors = { 
    tag: word_to_color(tag)
    for tag in tags
  }

  with open(TAG_COLORS_FILE, "w+") as f:
    f.write(json.dumps(tag_colors, indent=2))

