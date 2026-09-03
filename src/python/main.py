#! /usr/bin/python3

if __name__ == "__main__":
    from generate import main as generate_json
    from intermediate import sync_changelog_from_yaml, sort_new_dles, create_changelog_md, write_dles_to_readme_md, update_new_dles_from_changelog

    generate_json()
    sync_changelog_from_yaml()
    update_new_dles_from_changelog()
    sort_new_dles()
    create_changelog_md()
    write_dles_to_readme_md()
