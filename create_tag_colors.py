#!/usr/bin/python3

import json
import string
from colour import Color


def read_dls():
  with open("dls.json", "r") as f:
    return json.loads(f.read())


def extract_tags(dls):
  return list(set([
    tag for dl in dls 
    for tag in dl["tags"]
  ]))


def magnitude_to_hex(magnitude):
  return f'#{hex(int(magnitude * 16**6))[2:].zfill(6)}'


def word_to_color(word):
  color = ""
  letters = [c.lower() for c in word if c.lower() in string.ascii_lowercase]
  magnitude = sum(
    string.ascii_lowercase.index(letter) * 26 ** (len(letters) - i - 1)
    for i, letter in enumerate(letters)
  ) / 26 ** len(letters)
  print(word, magnitude)

  color = Color(magnitude_to_hex(magnitude))
  # color.set_saturation(0.5)
  color.set_luminance(0.8)
  return color.hex


def letter_to_int(letter):
  return string.ascii_lowercase.index(letter.lower())


# def word_to_int(word):


if __name__ == "__main__":
  dls = read_dls()
  tags = extract_tags(dls)
  tag_colors = { 
    tag: word_to_color(tag)
    for tag in tags
  }

  with open("tag_colors.json", "w+") as f:
    f.write(json.dumps(tag_colors))

