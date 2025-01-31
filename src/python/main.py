#! /usr/bin/python3


if __name__ == "__main__":
    from intermediate import create_tag_colors, sort_tags, sort_dles, sort_new_dles, add_changes_to_changelog, create_changelog_md, write_dles_to_readme_md

    create_tag_colors()
    sort_tags()
    sort_dles()
    sort_new_dles()
    add_changes_to_changelog()
    create_changelog_md()
    write_dles_to_readme_md()
