# The Dles

"They call them the dles but they are anything but." - Northernlion

The dles is a curated collection of daily web games. A "dle" is generally a game that changes everyday which has the same version for everyone that plays, often taking inspiration from [Wordle](https://en.wikipedia.org/wiki/Wordle).

View the app [here](https://aukspot.github.io/dles/) or view the list in a markdown table at the [bottom of this README](https://github.com/aukspot/dles/tree/main?tab=readme-ov-file#current-list-of-dles).

## Features

You can suggest a feature by [submitting a feature request](https://github.com/aukspot/dles/issues/new?assignees=&labels=enhancement&projects=&template=feature_request.md&title=).

### Current

- Tag system that allows for easy filtering.
- Filter dles by adding tags to include or exclude.
- Randomly choose a dle from the filtered dles.

### Planned

- Option for a more compact view.
- Option to hide/show given dles.
- Ability to randomly choose `n` dles from the filtered dles.
- URL parameters:
  - to load filters.
  - to load an exact list of dles. (each dle must be in [dles.json](https://github.com/aukspot/dles/blob/main/src/lib/data/dles.json))

## Bugs

If you run into a bug, please [submit a bug report](https://github.com/aukspot/dles/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title=).

## Contributing

The easiest way to help the project is to suggest new dles by either filling out [this form](https://aukspot.github.io/dles/suggest) or [opening a "dle suggestion" issue](https://github.com/aukspot/dles/issues/new?assignees=&labels=dles+suggestion&projects=&template=suggest-a-dle-.md&title=Dle+suggestion).

If you want to get your hands dirty, you can clone the repository and choose one or both of the below options to start contributing.

### Adding dles the hard way

In order to add a dle, we need to clone the repo, edit [dles.json](https://github.com/aukspot/dles/blob/main/src/lib/data/dles.json), and run the python script [main.py](https://github.com/aukspot/dles/blob/main/src/python/main.py).

Make sure you have python 3.4+ installed. Python is needed to create tag colors, sort the `.json` files, create `CHANGELOG.md`, and write the list of dles to `README.md`.

Clone the repository and edit `./src/lib/data/dles.json`. When adding a new dle, make sure to include a name, url, description, and appropriate tags.

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

# For subsequent times in the same development environment, only steps (1) and (3) are necessary, with (4) only needed when requirements.txt changes.
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

## Current list of dles

**Last updated `2024-04-10`** ([view changelog](https://github.com/aukspot/dles/blob/main/CHANGELOG.md))

|     | name                                                                                       | description                                                                                                                             |
|----:|:-------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------|
|   1 | [Acted](https://acted.wtf/)                                                                | Guess the name of the movie based on images of its actors.                                                                              |
|   2 | [Adoptle](https://tryhardguides.com/adoptle/)                                              | Guess the name of a pet that is up for adoption, given a picture of them.                                                               |
|   3 | [Apparle](https://www.apparle.com/)                                                        | Guess the price of the shown apparel product in 6 guesses or less.                                                                      |
|   4 | [Archiguessr](https://archiguesser.com/)                                                   | Guess the name of the architecture, given a series of pictures.                                                                         |
|   5 | [Bandle](https://bandle.app/)                                                              | Guess the song, one instrument at a time (sort of).                                                                                     |
|   6 | [Boggdle](https://simenmh.com/boggdle/)                                                    | Search for the best 3 words you can find in the Boggle grid.                                                                            |
|   7 | [Box Office Game](https://boxofficega.me/)                                                 | Guess the top five movies in the US domestic box office for the given weekend.                                                          |
|   8 | [Chrono](https://chrono.quest/)                                                            | Put the events in chronological order in 3 tries or less.                                                                               |
|   9 | [Chronophoto](https://www.chronophoto.app/)                                                | Guess the year in which each historical picture was taken.                                                                              |
|  10 | [Cine2Nerdle](https://www.cinenerdle2.app/)                                                | Rearrange the tiles into groups that represent movies/themes. Includes both Original and Reversal.                                      |
|  11 | [Cinematrix](https://www.vulture.com/article/daily-movie-grid-trivia-game-cinematrix.html) | Fill out the grid with movies matching the criteria of each cell's row and column. Changes every weekday.                               |
|  12 | [Colorfle](https://colorfle.org/index.html)                                                | Figure out the color composition of the given color.                                                                                    |
|  13 | [Combinations](https://combinations.org/)                                                  | Create words using combinations of letters from the grid.                                                                               |
|  14 | [Concludle](https://tryhardguides.com/concludle/)                                          | Guess the secret answer from a series of clues.                                                                                         |
|  15 | [Conexo](https://conexo.ws/en)                                                             | Form groups of 4 words that have something in common.                                                                                   |
|  16 | [Connections Game](https://connectionsgame.com)                                            | Group words that share a common thread, basically a copy of NYT Connections but with 3 difficulty modes and a good archive.             |
|  17 | [Contexto](https://contexto.me/)                                                           | Guess words to see how close they are to the secret word in terms of context, eventually guessing the secret word.                      |
|  18 | [Costcodle](https://costcodle.com/)                                                        | Guess the price of the given Costco item.                                                                                               |
|  19 | [Crosswordle](https://crosswordle.vercel.app)                                              | Fill in the grid to logically fit a series of Wordle guesses.                                                                           |
|  20 | [crosswordle.com](https://crosswordle.com/)                                                | Swap tiles to solve multiple Wordle puzzles crossed together.                                                                           |
|  21 | [crosswordle.org](https://crosswordle.org/)                                                | Solve multiple Wordle puzzles crossed together.                                                                                         |
|  22 | [Daily Dozen Trivia](https://dailydozentrivia.com/)                                        | Answer 9 trivia questions from various categories.                                                                                      |
|  23 | [Daily Tomato](https://www.rottentomatoes.com/movie-trivia/)                               | Guess the movie title from a series of 5 clues, by Rotten Tomatoes.                                                                     |
|  24 | [Daydle](https://daydle.com/)                                                              | Guess the year of a historical event that happened on this day in history.                                                              |
|  25 | [Doople](https://www.dooplepuzzle.com/)                                                    | Chain word combinations together to fit the given clues.                                                                                |
|  26 | [Dordle](https://zaratustra.itch.io/dordle)                                                | Solve 2 Wordle puzzles at the same time.                                                                                                |
|  27 | [Echo Chess](https://echochess.com/game.html)                                              | Solve the chess puzzle where you have to capture all black pieces to win and your piece becomes what it captures.                       |
|  28 | [Flagdle](https://www.flagdle.org/)                                                        | Guess the country by its flag.                                                                                                          |
|  29 | [Flagle](https://www.flagle.io/)                                                           | Guess the flag in 5 guesses or less.                                                                                                    |
|  30 | [Foodguessr](https://www.foodguessr.com/daily)                                             | Guess what country each of the food dishes are from.                                                                                    |
|  31 | [Framed](https://framed.wtf/)                                                              | Guess the movie from 6 frames.                                                                                                          |
|  32 | [Gamedle Artwork](https://www.gamedle.wtf/artwork)                                         | Guess the video game by its artwork.                                                                                                    |
|  33 | [Gamedle Classic](https://www.gamedle.wtf/classic)                                         | Guess the video game by its cover.                                                                                                      |
|  34 | [Gamedle Guess](https://www.gamedle.wtf/guess)                                             | Guess the video game by its specifications.                                                                                             |
|  35 | [Gamedle Keywords](https://www.gamedle.wtf/keywords)                                       | Guess the video game by keywords.                                                                                                       |
|  36 | [Globle](https://globle-game.com/game)                                                     | Guess the mystery country, given how close it is to each guessed country.                                                               |
|  37 | [Globle Capitals](https://globle-capitals.com/)                                            | Guess the mystery world capital, given how close it is to each guessed world capital.                                                   |
|  38 | [Guess The Audio](https://guesstheaudio.com/)                                              | Guess the song from listening to small parts of it, getting a clue after each guess.                                                    |
|  39 | [Guess The Game](https://guessthe.game/)                                                   | Guess the video game by its cropped screenshots.                                                                                        |
|  40 | [hello wordl](https://hellowordl.net/?today)                                               | Play Wordle puzzles from 4 to 11 letters long.                                                                                          |
|  41 | [Hexcodle](https://www.hexcodle.com/)                                                      | Guess the 6-digit hex code of the shown color in 5 tries or less.                                                                       |
|  42 | [Hexcodle Mini](https://www.hexcodle.com/mini)                                             | Guess the 3-digit hex code of the shown color in 5 tries or less. Easier version of Hexcodle.                                           |
|  43 | [Hitori Conquest](https://hitoriconquest.com/)                                             | Eliminate cells in the grid to remove row or column duplicates and satisfy the given rules.                                             |
|  44 | [Housle](https://housle.house/game)                                                        | Guess the price of the house, given pictures of parts of the house.                                                                     |
|  45 | [Immaculate Footy](https://www.immaculatefooty.com)                                        | Fill out the grid with soccer players matching the criteria of each cell's row and column.                                              |
|  46 | [Immaculate Grid: Baseball](https://www.immaculategrid.com/)                               | Fill out the grid with baseball players matching the criteria of each cell's row and column.                                            |
|  47 | [Immaculate Grid: Hockey](https://www.immaculategrid.com/hockey)                           | Fill out the grid with hockey players matching the criteria of each cell's row and column.                                              |
|  48 | [Immaculate Grid: Men's Basketball](https://www.immaculategrid.com/basketball/mens)        | Fill out the grid with men's basketball players matching the criteria of each cell's row and column.                                    |
|  49 | [Immaculate Grid: Pro Football](https://www.immaculategrid.com/football)                   | Fill out the grid with pro football players matching the criteria of each cell's row and column.                                        |
|  50 | [Immaculate Grid: Women's Basketball](https://www.immaculategrid.com/basketball/womens)    | Fill out the grid with women's basketball players matching the criteria of each cell's row and column.                                  |
|  51 | [Karat](https://karat.auronymous.com/)                                                     | Turn the rings of the ingot until each side forms a word - in 24 turns or less.                                                         |
|  52 | [Keyword](https://www.washingtonpost.com/games/keyword/)                                   | Find the target word by guessing the final letter of the vertical words.                                                                |
|  53 | [Letterset](https://www.letterset.net/daily)                                               | Spell words with the given letters to earn points. Longer words help prolong the game and earn more points.                             |
|  54 | [Listed](https://listed.fun/)                                                              | Guess the price of the recently sold property.                                                                                          |
|  55 | [MapGame](https://mapgame.net/)                                                            | Use the map to guess a country, getting new hints after each guess.                                                                     |
|  56 | [Mathler](https://www.mathler.com/)                                                        | Find the hidden calculation that equals the given number.                                                                               |
|  57 | [Metaflora](https://flora.metazooa.com/)                                                   | Guess plants to see where they share common ancestors with the mystery plant, eventually guessing the mystery plant.                    |
|  58 | [Metazooa](https://metazooa.com/)                                                          | Guess animals to see where they share common ancestors with the mystery animal, eventually guessing the mystery animal.                 |
|  59 | [Mislettered](https://tryhardguides.com/mislettered/)                                      | Solve the word or phrase by guessing one letter at a time.                                                                              |
|  60 | [MLB Pickle](https://www.mlbpickle.com/)                                                   | Guess today's mystery MLB player within nine guesses.                                                                                   |
|  61 | [Movie Grid](https://moviegrid.io/)                                                        | Fill out the grid with movies matching the criteria of each cell's row and column.                                                      |
|  62 | [Movie to Movie](https://movietomovie.com/)                                                | Connect two movies by jumping through actors and the movies they've been in.                                                            |
|  63 | [Neighborle](https://neighborle.com/)                                                      | Guess the countries that border the highlighted country on the map.                                                                     |
|  64 | [Nerdle](https://nerdlegame.com/)                                                          | Guess the secret arithmetic equation.                                                                                                   |
|  65 | [Numble](https://numble.wtf/)                                                              | Reach the target number only using operations and each given number exactly once.                                                       |
|  66 | [NYT Connections](https://www.nytimes.com/games/connections)                               | Group words that share a common thread.                                                                                                 |
|  67 | [NYT Mini Crossword](https://www.nytimes.com/crosswords/game/mini)                         | A very small crossword puzzle by the New York Times.                                                                                    |
|  68 | [NYT Strands](https://www.nytimes.com/games/strands)                                       | Find hidden words and uncover the day's theme.                                                                                          |
|  69 | [NYT Sudoku](https://www.nytimes.com/puzzles/sudoku)                                       | Daily Sudoku puzzles from the New York Times.                                                                                           |
|  70 | [NYT Wordle](https://www.nytimes.com/games/wordle/index.html)                              | Guess the 5-letter word in six or fewer attempts.                                                                                       |
|  71 | [OEC Tradle](https://games.oec.world/en/tradle/)                                           | Guess the country by its exports.                                                                                                       |
|  72 | [One Word Search](https://onewordsearch.com/)                                              | Repeatedly search for the only word in a grid of letters.                                                                               |
|  73 | [pedantle](https://cemantle.certitudes.org/pedantle)                                       | Find the secret Wikipedia page by revealing the words in its introduction.                                                              |
|  74 | [Petdle](https://petdle.link/)                                                             | Guess the pet taken from the game Super Auto Pets.                                                                                      |
|  75 | [Phrasle](https://phrasle.com/)                                                            | Reveal the phrase by guessing one letter at a time.                                                                                     |
|  76 | [Plotwords](https://plotwords.com/daily)                                                   | Guess the name of the movie using as few plot keywords as possible!                                                                     |
|  77 | [Pokedoku](https://pokedoku.com/)                                                          | Fill out the grid with Pokémon matching the criteria of each cell's row and column.                                                     |
|  78 | [Polygonle](https://www.polygonle.com/)                                                    | Guess the word in 6 tries, like Wordle. Each unique shape over a column represents a letter.                                            |
|  79 | [PopCultured](https://histordle.com/popcultured/)                                          | Guess the year given three pop culture items released that year.                                                                        |
|  80 | [Primel](https://converged.yt/primel/)                                                     | Guess the 5-digit prime number in six guesses or less.                                                                                  |
|  81 | [Puckdoku](https://www.puckdoku.com/)                                                      | Fill out the grid with hockey players matching the criteria of each cell's row and column.                                              |
|  82 | [Puzzmo - Crossword](https://www.puzzmo.com/play/crossword)                                | Crosswords without getting stuck.                                                                                                       |
|  83 | [Puzzmo - Flipart](https://www.puzzmo.com/play/flip-art)                                   | Rotate the pieces to fit them within the frame.                                                                                         |
|  84 | [Puzzmo - Really Bad Chess](https://www.puzzmo.com/play/really-bad-chess)                  | Checkmate the opponent's king in this randomized Chess variant.                                                                         |
|  85 | [Puzzmo - Spelltower](https://www.puzzmo.com/play/spelltower)                              | Find words to clear tiles in the falling grid.                                                                                          |
|  86 | [Puzzmo - Typeshift](https://www.puzzmo.com/play/typeshift)                                | Slide columns of letters to make words, using all of the letters along the way.                                                         |
|  87 | [Quizl](https://quizl.io/)                                                                 | Answer today's 5 trivia questions.                                                                                                      |
|  88 | [Quordle](https://quordlegame.com/)                                                        | Solve 4 Wordle puzzles at the same time.                                                                                                |
|  89 | [Redactle](https://redactle.net/)                                                          | Guess the Wikipedia article by its content with keywords redacted.                                                                      |
|  90 | [Relatle](https://www.relatle.lol/)                                                        | Guess the word based on one of its synonyms, given a new synonym after each guess.                                                      |
|  91 | [Rogule](https://rogule.com/game.html)                                                     | A daily emoji dungeon crawler roguelike.                                                                                                |
|  92 | [Satle](https://satle.ca/)                                                                 | Guess the city given a satellite image, zooming out after each guess.                                                                   |
|  93 | [Semantle](https://semantle.com/)                                                          | Guess words to see how close they are to the secret word semantically, eventually guessing the secret word.                             |
|  94 | [Songle](https://histordle.com/songle/)                                                    | Guess the year given three songs that were released that year.                                                                          |
|  95 | [Songless](https://lessgames.com/songless)                                                 | Guess the song from listening to small parts of it.                                                                                     |
|  96 | [Spellcheck](https://spellcheck.xyz/)                                                      | Spell the words correctly after listening to them.                                                                                      |
|  97 | [Spellie](https://spelliegame.com/)                                                        | Wordle for young spellers with 3 difficulty modes.                                                                                      |
|  98 | [Spelling Bee](https://spellsbee.com/)                                                     | Given 7 letters, make as many words as you can that contain the center letter. Same as NYT Spelling Bee, which requires a subscription. |
|  99 | [Stackle](https://www.stackle.fun/)                                                        | Build the tallest possible stack of words, swapping out one letter and scrambling the rest with each new word.                          |
| 100 | [Statele](https://statele.teuteuf.fr/)                                                     | Guess the US State by its outline on the map.                                                                                           |
| 101 | [Stepdle](https://www.stepdle.com/)                                                        | Solve 4 Wordle puzzles, one at a time, each word one letter longer than the last. You have 20 total guesses.                            |
| 102 | [Sumplete](https://sumplete.com/daily/)                                                    | Delete numbers so that each row and column adds up to their target number.                                                              |
| 103 | [Syllacrostic](https://www.syllacrostic.com/daily-puzzle)                                  | Combine syllables to solve the clues.                                                                                                   |
| 104 | [Thirdle](https://thirdle.org/)                                                            | Solve 3 Wordle puzzles crossed together.                                                                                                |
| 105 | [TimeGuessr](https://timeguessr.com/)                                                      | Guess the right time and location of each historical photo.                                                                             |
| 106 | [travle](https://travle.earth/)                                                            | Connect the starting country to the ending country by naming countries in between them.                                                 |
| 107 | [Twofer Goofer](https://twofergoofer.com/)                                                 | Guess the pair of rhyming words that form the given nonsensical phrase.                                                                 |
| 108 | [Unolingo](https://games.usatoday.com/games/uclick-unolingo)                               | Solve the clueless crossword by using each letter of the English alphabet exactly once.                                                 |
| 109 | [Weaver](https://weavergame.org/)                                                          | Weave your way from the start word to the end word, changing only one letter at a time.                                                 |
| 110 | [Where in the USA is this?](https://pudding.cool/games/where/)                             | Guess the location in the United States given 5 pictures of the same place, one at a time.                                              |
| 111 | [WhereTaken](https://wheretaken.teuteuf.fr/)                                               | Guess the Country/Region in which the photo was taken.                                                                                  |
| 112 | [WhereTaken USA](https://wheretakenusa.teuteuf.fr/)                                        | Guess the US State in which the photo was taken.                                                                                        |
| 113 | [Word Chase](https://wordchase.semantle.com/)                                              | Guess the secret word within 5 tries, receiving a new word as a hint before each guess.                                                 |
| 114 | [Word Waffle](https://wordwaffle.org/)                                                     | Move letters to create words both horizontally and vertically.                                                                          |
| 115 | [WordAll](https://wordall.xyz/)                                                            | Guess all of the Wordle words, given the starting clues.                                                                                |
| 116 | [Wordless](https://lessgames.com/wordless)                                                 | Solve Wordle puzzles of various sizes.                                                                                                  |
| 117 | [Worldle](https://worldle.teuteuf.fr/)                                                     | Guess the country by its shape on the world map.                                                                                        |
| 118 | [Yeardle](https://histordle.com/yeardle/)                                                  | Guess the year based on the given historical events of that year.                                                                       |