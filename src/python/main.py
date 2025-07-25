#! /usr/bin/python3


if __name__ == "__main__":
    from intermediate import sort_dles, sort_new_dles, add_changes_to_changelog, create_changelog_md, write_dles_to_readme_md, update_new_dles_from_changelog, add_ids_to_dles

    sort_dles()
    add_ids_to_dles()
    add_changes_to_changelog()
    update_new_dles_from_changelog()
    sort_new_dles()
    create_changelog_md()
    write_dles_to_readme_md()
