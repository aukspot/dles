# The Dles

"They call them the dles but they are anything but." - Northernlion

The dles is a curated collection of daily web games. A "dle" is generally a game that changes everyday which has the same version for everyone that plays, often taking inspiration from [Wordle](https://en.wikipedia.org/wiki/Wordle).

View the app [here](https://aukspot.github.io/dles/).

## Features

### Current

- Tag system that allows for easy filtering.
- Filter dles easily by adding tags to include or exclude.

### Planned

- Ability to hide/show given dles.
- Ability to randomly choose `n` dles from the filtered dles.
- URL parameters:
  - to load filters.
  - to load an exact list of dles. (each dle must be in `dles.json`)

### Suggest a feature

You can suggest a feature by [submitting a feature request](https://github.com/aukspot/dles/issues/new?assignees=&labels=enhancement&projects=&template=feature_request.md&title=).

## Contributing

The easiest way to help the project is to suggest new dles by [opening a "dle suggestion" issue](https://github.com/aukspot/dles/issues/new?assignees=&labels=dles+suggestion&projects=&template=suggest-a-dle-.md&title=Dle+suggestion).

If you want to get your hands dirty, you can clone the repository and choose one or both of the below options to start contributing.

### Adding dles the hard way

In order to add a dle, we need to clone the repo, edit `dles.json`, and run the python script `main.py`.

Make sure you have python 3.4+ installed. Python is needed to create tag colors and sort the `.json` files.

Clone the repository and edit `./src/data/dles.json`. When adding a new dle, make sure to include a name, url, description, and appropriate tags.

Once you're finished, you'll need to create a python virtual environment and use `pip` to install the `requirements.txt`:

```bash
# (1) Move into the python directory:
cd src/python

# (2) Create a new virtual environment:
python3 -m venv .venv

# (3) Activate the environment, depends on your shell:
# bash
source .venv/bin/activate
# fish
source .venv/bin/activate.fish
# Windows Command Prompt
venv\Scripts\activate.bat
# Windows PowerShell
venv\Scripts\Activate.ps1

# (4) Install requirements.txt
pip install -r requirements.txt

# In subsequent instances on the same development system, only steps (1) and (3) are necessary.
```

After making changes to `dles.json`, make sure you're in `src/python` and run the `main.py` script:

```bash
python3 main.py
```

This will create the tag colors in `tag_colors.json` and sort `dles.json`.

That's all!

Ideally, this part would be ran automatically before building the project, but I haven't figured out a way to do that yet.

### Development

The app is written in Svelte with SvelteKit. You will need to have `npm` installed.

To get started, clone the repository and go into the project's folder.

#### Install dependencies

```bash
npm install
```

#### Start development server

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

#### Building

When you're ready to create a production version of the project, run the following:

```bash
npm run build
```

This will update the `./docs` directory with a new build of the site.

## Bugs

If you run into a bug, please [submit a bug report](https://github.com/aukspot/dles/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title=).
