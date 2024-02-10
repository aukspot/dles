#! /usr/bin/python3

import re
import json
import copy


def read_template_html():
    with open("template.html", "r") as f:
        return f.read()


def generate_replacements(template_html):
    result = {}
    template_strings = re.findall(r"\$TEMPLATE\[(.*)\]", template_html)
    for template_string in template_strings:
        search_regex = re.escape(fr"$TEMPLATE[{template_string}]")
        with open(template_string, "r") as f:
            value = f.read()
            result[search_regex] = value
    return result


def replace_template(replacements_dict, template_html):
    result = copy.copy(template_html)
    for key in replacements_dict:
        result = re.sub(key, replacements_dict[key], result)
    return result


def write_to_index_html(html):
    with open("index.html", "w+") as f:
        f.write(html)


if __name__ == "__main__":
    from intermediate import create_tag_colors, sort_tags, sort_dles
    
    sort_tags()
    sort_dles()
    create_tag_colors()
    template_html = read_template_html()
    replacements = generate_replacements(template_html)
    index_html = replace_template(replacements, template_html)
    write_to_index_html(index_html)

