#! /usr/bin/python3

import argparse
import os
import sys

from generate import YAML_DIR, slugify, write_yaml

FIELDS = ["name", "url", "description", "category"]

CATEGORIES = [
    "Card/Board Games",
    "Colors",
    "Estimation",
    "Food",
    "Geography",
    "History",
    "Math/Logic",
    "Miscellaneous",
    "Movies/TV",
    "Music",
    "Novelty",
    "Science/Nature",
    "Shapes/Patterns",
    "Sports",
    "Trivia",
    "Vehicles",
    "Video Games",
    "Words",
]


def dle_path(name):
    slug = slugify(name) if name else "dle"
    path = os.path.join(YAML_DIR, f"new-{slug}.yaml")
    if not os.path.exists(path):
        return path
    for suffix in range(2, 100):
        path = os.path.join(YAML_DIR, f"new-{slug}-{suffix}.yaml")
        if not os.path.exists(path):
            return path
    raise SystemExit(f"Too many named new-{slug}")


def prompt(values):
    print("Categories: " + ", ".join(CATEGORIES) + "\n")
    for field in FIELDS:
        current = values.get(field, "")
        shown = f" [{current}]" if current else ""
        answer = input(f"{field}{shown}: ").strip()
        if answer:
            values[field] = answer
    return values


def check_category(category):
    if category and category not in CATEGORIES:
        print(f"WARNING: '{category}' is not an existing category.")
        print("Existing: " + ", ".join(CATEGORIES))


def main(argv=None):
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    parser = argparse.ArgumentParser(description="Create a new dle YAML stub.")
    parser.add_argument("name", nargs="?", default="", help="game name")
    parser.add_argument("url", nargs="?", default="", help="game url")
    parser.add_argument("-n", "--name", dest="name_opt", default="")
    parser.add_argument("-u", "--url", dest="url_opt", default="")
    parser.add_argument("-d", "--description", default="")
    parser.add_argument("-c", "--category", default="")
    parser.add_argument("-i", "--interactive", action="store_true",
                        help="ask for each field")
    args = parser.parse_args(argv)

    values = {
        "name": args.name_opt or args.name,
        "url": args.url_opt or args.url,
        "description": args.description,
        "category": args.category,
    }

    if args.interactive:
        values = prompt(values)

    check_category(values["category"])

    dle = {field: values[field] for field in FIELDS}
    dle["status"] = "active"

    path = dle_path(dle["name"])
    write_yaml(path, dle)

    print(f"Created {os.path.relpath(path)}")
    print("Fill in the blanks, then run main.py to assign an id and rebuild.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
