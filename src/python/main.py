#! /usr/bin/python3

import re
import json
import copy


if __name__ == "__main__":
    from intermediate import create_tag_colors, sort_tags, sort_dles, create_changelog_md, write_dles_to_readme_md
    
    create_tag_colors()
    sort_tags()
    sort_dles()
    create_changelog_md()
    write_dles_to_readme_md()
