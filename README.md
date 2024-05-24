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

Clone the repository and edit `./src/lib/data/dles.json`. When adding a new dle, make sure to include a name, url, description, appropriate tags, and a category.

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

# For subsequent times in the same development environment, 
# only steps (1) and (3) are necessary.
# Step (4) is needed when requirements.txt changes.
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

**Last updated `2024-05-24`** ([view changelog](https://github.com/aukspot/dles/blob/main/CHANGELOG.md))

|     | name                                                                                       | description                                                                                                                             | category          |
|----:|:-------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------|:------------------|
|   1 | [Absurdle](https://qntm.org/files/absurdle/absurdle.html)                                  | An adversarial version of Wordle that actively avoids giving you the answer.                                                            | Words             |
|   2 | [Acted](https://acted.wtf/)                                                                | Guess the name of the movie based on images of its actors.                                                                              | Movies/TV         |
|   3 | [Actorle](https://actorle.com/)                                                            | Guess the movie actor based on the given information, with each guess revealing matching information.                                   | Movies/TV         |
|   4 | [Actorle - Fill The Grid](https://actorle.com/fill-the-grid/)                              | Fill the grid with actors that are cast in movies from each cell's corresponding row and column.                                        | Movies/TV         |
|   5 | [Actorle - Storyboard](https://actorle.com/storyboard/)                                    | Rearrange the movie frames in chronological order.                                                                                      | Movies/TV         |
|   6 | [Actorle TV](https://actorle.tv/)                                                          | Guess the TV actor based on the given information, with each guess revealing matching information.                                      | Movies/TV         |
|   7 | [Adoptle](https://tryhardguides.com/adoptle/)                                              | Guess the name of a pet that is up for adoption, given a picture of them.                                                               | Words             |
|   8 | [Angle](https://angle.wtf/)                                                                | Guess the angle in 4 guesses or less.                                                                                                   | Math/Logic        |
|   9 | [Anigrams](https://anigrams.us/)                                                           | Unscramble a series of words, revealing a new letter each time.                                                                         | Words             |
|  10 | [Apparle](https://www.apparle.com/)                                                        | Guess the price of the shown apparel product in 6 guesses or less.                                                                      | Prices            |
|  11 | [Archiguessr](https://archiguesser.com/)                                                   | Guess the name of the architecture, given a series of pictures.                                                                         | Miscellaneous     |
|  12 | [Bandle](https://bandle.app/)                                                              | Guess the song, one instrument at a time (sort of).                                                                                     | Music             |
|  13 | [Boggdle](https://simenmh.com/boggdle/)                                                    | Search for the best 3 words you can find in the Boggle grid.                                                                            | Words             |
|  14 | [Box Office Game](https://boxofficega.me/)                                                 | Guess the top five movies in the US domestic box office for the given weekend.                                                          | Movies/TV         |
|  15 | [BrainBashers Daily 30 Seconds](https://www.brainbashers.com/30seconds.asp)                | Try to solve the arithmetic questions in 30 seconds, but it is okay if you go over.                                                     | Math/Logic        |
|  16 | [BrainBashers Daily Puzzle](https://www.brainbashers.com/dailypuzzle.asp)                  | A daily brainteaser from BrainBashers.                                                                                                  | Math/Logic        |
|  17 | [Brickdle](https://www.brickdle.com/)                                                      | Guess the number of pieces in the pictured LEGO set.                                                                                    | Miscellaneous     |
|  18 | [Calcle](https://calclegame.com/)                                                          | Guess the numbers in the equation in 5 attempts or less.                                                                                | Math/Logic        |
|  19 | [Cell Tower](https://www.andrewt.net/puzzles/cell-tower/)                                  | Divide the grid into regions such that each region represents a word.                                                                   | Words             |
|  20 | [Chainagram](https://puzzletrail.games/puzzles/chainagram/)                                | Make a chain linking two words together by changing one letter and making an anagram at each step.                                      | Words             |
|  21 | [Chess.com Daily Puzzle](https://www.chess.com/daily-chess-puzzle)                         | Solve the daily chess puzzle from chess.com.                                                                                            | Math/Logic        |
|  22 | [Chessle](https://jackli.gg/chessle/)                                                      | Guess today's entire opening Chess sequence.                                                                                            | Math/Logic        |
|  23 | [Chrono](https://chrono.quest/)                                                            | Put the events in chronological order in 3 tries or less.                                                                               | Geography/History |
|  24 | [Chronoline](https://chronoline.app/daily)                                                 | One by one, place each historical event in the correct spot on the timeline without making 5 mistakes.                                  | Geography/History |
|  25 | [Chronophoto](https://www.chronophoto.app/)                                                | Guess the year in which each historical picture was taken.                                                                              | Geography/History |
|  26 | [Cine2Nerdle](https://www.cinenerdle2.app/)                                                | Rearrange the tiles into groups that represent movies/themes. Includes both Original and Reversal.                                      | Movies/TV         |
|  27 | [Cinematrix](https://www.vulture.com/article/daily-movie-grid-trivia-game-cinematrix.html) | Fill out the grid with movies matching the criteria of each cell's row and column. Changes every weekday.                               | Movies/TV         |
|  28 | [Colorfle](https://colorfle.org/index.html)                                                | Figure out the color composition of the given color.                                                                                    | Miscellaneous     |
|  29 | [ColorGuesser](https://colorguesser.com/)                                                  | Guess the actual color that each of the color names represent.                                                                          | Miscellaneous     |
|  30 | [Combinations](https://combinations.org/)                                                  | Create words using combinations of letters from the grid.                                                                               | Words             |
|  31 | [Concludle](https://tryhardguides.com/concludle/)                                          | Guess the secret answer from a series of clues.                                                                                         | Trivia            |
|  32 | [Conexo](https://conexo.ws/en)                                                             | Form groups of 4 words that have something in common.                                                                                   | Words             |
|  33 | [Connections Game](https://connectionsgame.com)                                            | Group words that share a common thread, basically a copy of NYT Connections but with 3 difficulty modes and a good archive.             | Words             |
|  34 | [Contexto](https://contexto.me/)                                                           | Guess words to see how close they are to the secret word in terms of context, eventually guessing the secret word.                      | Words             |
|  35 | [Costcodle](https://costcodle.com/)                                                        | Guess the price of the given Costco item.                                                                                               | Prices            |
|  36 | [Countryle](https://www.countryle.com/)                                                    | Guess the country in as few attempts as possible with the given clues.                                                                  | Geography/History |
|  37 | [Crosswordle](https://crosswordle.vercel.app)                                              | Fill in the grid to logically fit a series of Wordle guesses.                                                                           | Words             |
|  38 | [crosswordle.com](https://crosswordle.com/)                                                | Swap tiles to solve multiple Wordle puzzles crossed together.                                                                           | Words             |
|  39 | [crosswordle.org](https://crosswordle.org/)                                                | Solve multiple Wordle puzzles crossed together.                                                                                         | Words             |
|  40 | [Daily Dozen Trivia](https://dailydozentrivia.com/)                                        | Answer 9 trivia questions from various categories.                                                                                      | Trivia            |
|  41 | [Daily Jingle](https://dailyjingle.me/)                                                    | Guess the melody within 5 tries.                                                                                                        | Music             |
|  42 | [Daily Tomato](https://www.rottentomatoes.com/movie-trivia/)                               | Guess the movie title from a series of 5 clues, by Rotten Tomatoes.                                                                     | Movies/TV         |
|  43 | [DayBrix](https://vole.wtf/daybrix/)                                                       | Daily tetris-style falling blocks game.                                                                                                 | Miscellaneous     |
|  44 | [Daydle](https://daydle.com/)                                                              | Guess the year of a historical event that happened on this day in history.                                                              | Geography/History |
|  45 | [Dicele](https://dicele.com/)                                                              | Swap dice to make each row and column sum up to their target number.                                                                    | Math/Logic        |
|  46 | [Disney Heardle](https://diz-nee-heardle.glitch.me/)                                       | Guess the Disney song from listening to small parts of it.                                                                              | Music             |
|  47 | [Disorderly](https://playdisorderly.com/)                                                  | Order the items correctly based on the given criteria.                                                                                  | Trivia            |
|  48 | [Doople](https://www.dooplepuzzle.com/)                                                    | Chain word combinations together to fit the given clues.                                                                                | Words             |
|  49 | [Dordle](https://zaratustra.itch.io/dordle)                                                | Solve 2 Wordle puzzles at the same time.                                                                                                | Words             |
|  50 | [Duotrigordle](https://duotrigordle.com/)                                                  | Solve 32 Wordle puzzles at the same time.                                                                                               | Words             |
|  51 | [Facedle](https://facedle.app/)                                                            | Guess the famous person in the partially covered picture.                                                                               | Miscellaneous     |
|  52 | [Figure](https://figure.game/)                                                             | Clear all of the tiles before running out of moves.                                                                                     | Math/Logic        |
|  53 | [Flagdle](https://www.flagdle.org/)                                                        | Guess the country by its flag.                                                                                                          | Geography/History |
|  54 | [Flagle](https://www.flagle.io/)                                                           | Guess the flag in 5 guesses or less.                                                                                                    | Geography/History |
|  55 | [Flickle](https://flickle.app/)                                                            | Guess the movie based on the given video clips.                                                                                         | Movies/TV         |
|  56 | [Foodguessr](https://www.foodguessr.com/daily)                                             | Guess what country each of the food dishes are from.                                                                                    | Geography/History |
|  57 | [Framed](https://framed.wtf/)                                                              | Guess the movie from 6 frames.                                                                                                          | Movies/TV         |
|  58 | [Gamedle Artwork](https://www.gamedle.wtf/artwork)                                         | Guess the video game by its artwork.                                                                                                    | Video Games       |
|  59 | [Gamedle Classic](https://www.gamedle.wtf/classic)                                         | Guess the video game by its cover.                                                                                                      | Video Games       |
|  60 | [Gamedle Guess](https://www.gamedle.wtf/guess)                                             | Guess the video game by its specifications.                                                                                             | Video Games       |
|  61 | [Gamedle Keywords](https://www.gamedle.wtf/keywords)                                       | Guess the video game by keywords.                                                                                                       | Video Games       |
|  62 | [Gaps](https://gaps.wtf/)                                                                  | Guess the movie based on the blanks and given information.                                                                              | Movies/TV         |
|  63 | [Globle](https://globle-game.com/game)                                                     | Guess the mystery country, given how close it is to each guessed country.                                                               | Geography/History |
|  64 | [Globle Capitals](https://globle-capitals.com/)                                            | Guess the mystery world capital, given how close it is to each guessed world capital.                                                   | Geography/History |
|  65 | [Gram Jam](https://gramjam.app/)                                                           | Clear the board in under 20 swaps, clearing letters by creating words on full rows or columns.                                          | Words             |
|  66 | [Griddle](https://griddlegame.io/)                                                         | Form words by placing letters on the board to get the highest score you can in this Scrabble-like daily game.                           | Words             |
|  67 | [Guess My Word](https://hryanjones.com/guess-my-word/)                                     | Make guesses and see if they are alphabetically before or after the secret word.                                                        | Words             |
|  68 | [Guess The Audio](https://guesstheaudio.com/)                                              | Guess the song from listening to small parts of it, getting a clue after each guess.                                                    | Music             |
|  69 | [Guess The Game](https://guessthe.game/)                                                   | Guess the video game by its cropped screenshots.                                                                                        | Video Games       |
|  70 | [Heardle 1950's](https://50s.heardledecades.com/)                                          | Guess the 1950's song from listening to small parts of it.                                                                              | Music             |
|  71 | [Heardle 1960's](https://60s.heardledecades.com/)                                          | Guess the 1960's song from listening to small parts of it.                                                                              | Music             |
|  72 | [Heardle 1970's](https://70s.heardledecades.com/)                                          | Guess the 1970's song from listening to small parts of it.                                                                              | Music             |
|  73 | [Heardle 1980's](https://80s.heardledecades.com/)                                          | Guess the 1980's song from listening to small parts of it.                                                                              | Music             |
|  74 | [Heardle 1990's](https://90s.heardledecades.com/)                                          | Guess the 1990's song from listening to small parts of it.                                                                              | Music             |
|  75 | [Heardle 2000's](https://00s.heardledecades.com/)                                          | Guess the 2000's song from listening to small parts of it.                                                                              | Music             |
|  76 | [Heardle 2010's](https://heardle10s.com/)                                                  | Guess the 2010's song from listening to small parts of it.                                                                              | Music             |
|  77 | [Heardle TV Themes](https://tv.heardledecades.xyz/)                                        | Guess the TV theme song from listening to small parts of it.                                                                            | Music             |
|  78 | [hello wordl](https://hellowordl.net/?today)                                               | Play Wordle puzzles from 4 to 11 letters long.                                                                                          | Words             |
|  79 | [Hexcodle](https://www.hexcodle.com/)                                                      | Guess the 6-digit hex code of the shown color in 5 tries or less.                                                                       | Miscellaneous     |
|  80 | [Hexcodle Mini](https://www.hexcodle.com/mini)                                             | Guess the 3-digit hex code of the shown color in 5 tries or less. Easier version of Hexcodle.                                           | Miscellaneous     |
|  81 | [Hitori Conquest](https://hitoriconquest.com/)                                             | Eliminate cells in the grid to remove row or column duplicates and satisfy the given rules.                                             | Math/Logic        |
|  82 | [Housle](https://housle.house/game)                                                        | Guess the price of the house, given pictures of parts of the house.                                                                     | Prices            |
|  83 | [Immaculate Footy](https://www.immaculatefooty.com)                                        | Fill out the grid with soccer players matching the criteria of each cell's row and column.                                              | Sports            |
|  84 | [Immaculate Grid: Baseball](https://www.immaculategrid.com/)                               | Fill out the grid with baseball players matching the criteria of each cell's row and column.                                            | Sports            |
|  85 | [Immaculate Grid: Hockey](https://www.immaculategrid.com/hockey)                           | Fill out the grid with hockey players matching the criteria of each cell's row and column.                                              | Sports            |
|  86 | [Immaculate Grid: Men's Basketball](https://www.immaculategrid.com/basketball/mens)        | Fill out the grid with men's basketball players matching the criteria of each cell's row and column.                                    | Sports            |
|  87 | [Immaculate Grid: Pro Football](https://www.immaculategrid.com/football)                   | Fill out the grid with pro football players matching the criteria of each cell's row and column.                                        | Sports            |
|  88 | [Immaculate Grid: Women's Basketball](https://www.immaculategrid.com/basketball/womens)    | Fill out the grid with women's basketball players matching the criteria of each cell's row and column.                                  | Sports            |
|  89 | [Jeopardle](https://jeopardle.co/)                                                         | Answer today's Jeopardy questions from the given category.                                                                              | Trivia            |
|  90 | [Jumblie](https://jumblie.com/)                                                            | Find the 4 themed words hidden amongst the letters such that all letters are used exactly once.                                         | Words             |
|  91 | [Juxtastat](https://urbanstats.org/quiz.html)                                              | For 5 rounds, guess which of the two US regions better fits the given criteria.                                                         | Geography/History |
|  92 | [Karat](https://karat.auronymous.com/)                                                     | Turn the rings of the ingot until each side forms a word - in 24 turns or less.                                                         | Words             |
|  93 | [Keyword](https://www.washingtonpost.com/games/keyword/)                                   | Find the target word by guessing the final letter of the vertical words.                                                                | Words             |
|  94 | [Letterset](https://www.letterset.net/daily)                                               | Spell words with the given letters to earn points. Longer words help prolong the game and earn more points.                             | Words             |
|  95 | [Lingule](https://lingule.xyz/)                                                            | Guess the language of the today's word in 6 guesses or less.                                                                            | Words             |
|  96 | [LINKR](https://www.playlinkr.net/)                                                        | Link each pair of numbered points together in three daily puzzles.                                                                      | Math/Logic        |
|  97 | [Linxicon](https://linxicon.com/)                                                          | Connect two random words by creating a chain of new words that bridge the gap in their meanings.                                        | Words             |
|  98 | [Listed](https://listed.fun/)                                                              | Guess the price of the recently sold property.                                                                                          | Prices            |
|  99 | [Locatle](https://locatle.strct.net/)                                                      | Guess the country that the picture was taken in.                                                                                        | Geography/History |
| 100 | [Lyricle](https://www.lyricle.app/)                                                        | Guess the song from the given lyrics.                                                                                                   | Music             |
| 101 | [MapGame](https://mapgame.net/)                                                            | Use the map to guess a country, getting new hints after each guess.                                                                     | Geography/History |
| 102 | [Mathler](https://www.mathler.com/)                                                        | Find the hidden calculation that equals the given number.                                                                               | Math/Logic        |
| 103 | [Metaflora](https://flora.metazooa.com/)                                                   | Guess plants to see where they share common ancestors with the mystery plant, eventually guessing the mystery plant.                    | Miscellaneous     |
| 104 | [Metazooa](https://metazooa.com/)                                                          | Guess animals to see where they share common ancestors with the mystery animal, eventually guessing the mystery animal.                 | Miscellaneous     |
| 105 | [Mislettered](https://tryhardguides.com/mislettered/)                                      | Solve the word or phrase by guessing one letter at a time.                                                                              | Words             |
| 106 | [MLB Pickle](https://www.mlbpickle.com/)                                                   | Guess today's mystery MLB player within nine guesses.                                                                                   | Sports            |
| 107 | [Movie Grid](https://moviegrid.io/)                                                        | Fill out the grid with movies matching the criteria of each cell's row and column.                                                      | Movies/TV         |
| 108 | [Movie to Movie](https://movietomovie.com/)                                                | Connect two movies by jumping through actors and the movies they've been in.                                                            | Movies/TV         |
| 109 | [Moviedle](https://moviedle.xyz/)                                                          | Guess the movie based on the given information, with each guess revealing matching information.                                         | Movies/TV         |
| 110 | [Moviedle - Fill The Grid](https://moviedle.xyz/fill-the-grid/)                            | Fill the grid with movies that contain actors from each cell's corresponding row and column.                                            | Movies/TV         |
| 111 | [Moviedle - Moviemoji](https://moviedle.xyz/moviemoji/)                                    | Guess the movie based on the given emojis.                                                                                              | Movies/TV         |
| 112 | [Moviedle - Twenty Questions](https://moviedle.xyz/twenty/)                                | You have 20 yes or no questions to figure out the secret movie.                                                                         | Movies/TV         |
| 113 | [Moviemoji](https://www.playmoviemoji.com/)                                                | Guess the movie based on the given emojis.                                                                                              | Movies/TV         |
| 114 | [Neighborle](https://neighborle.com/)                                                      | Guess the countries that border the highlighted country on the map.                                                                     | Geography/History |
| 115 | [Nerdle](https://nerdlegame.com/)                                                          | Guess the secret arithmetic equation.                                                                                                   | Math/Logic        |
| 116 | [Numble](https://numble.wtf/)                                                              | Reach the target number only using operations and each given number exactly once.                                                       | Math/Logic        |
| 117 | [NYT Connections](https://www.nytimes.com/games/connections)                               | Group words that share a common thread.                                                                                                 | Words             |
| 118 | [NYT Mini Crossword](https://www.nytimes.com/crosswords/game/mini)                         | A very small crossword puzzle by the New York Times.                                                                                    | Words             |
| 119 | [NYT Strands](https://www.nytimes.com/games/strands)                                       | Find hidden words and uncover the day's theme.                                                                                          | Words             |
| 120 | [NYT Sudoku](https://www.nytimes.com/puzzles/sudoku)                                       | Daily Sudoku puzzles from the New York Times.                                                                                           | Math/Logic        |
| 121 | [NYT Wordle](https://www.nytimes.com/games/wordle/index.html)                              | Guess the 5-letter word in six or fewer attempts.                                                                                       | Words             |
| 122 | [OEC Connectrade](https://oec.world/en/games/connectrade)                                  | Form groups of four exported products that our associated with one of the given countries.                                              | Geography/History |
| 123 | [OEC Pick 5](https://oec.world/en/games/pick-5)                                            | Guess the top 5 countries that export the most of the given product.                                                                    | Geography/History |
| 124 | [OEC Tradle](https://games.oec.world/en/tradle/)                                           | Guess the country by its exports.                                                                                                       | Geography/History |
| 125 | [One Word Search](https://onewordsearch.com/)                                              | Repeatedly search for the only word in a grid of letters.                                                                               | Words             |
| 126 | [Order Up](https://orderup.games/)                                                         | Arrange the themed items in the correct order within 5 guesses.                                                                         | Trivia            |
| 127 | [pedantle](https://cemantle.certitudes.org/pedantle)                                       | Find the secret Wikipedia page by revealing the words in its introduction.                                                              | Words             |
| 128 | [Petdle](https://petdle.link/)                                                             | Guess the pet taken from the game Super Auto Pets.                                                                                      | Video Games       |
| 129 | [Phrasle](https://phrasle.com/)                                                            | Reveal the phrase by guessing one letter at a time.                                                                                     | Words             |
| 130 | [Plotwords](https://plotwords.com/daily)                                                   | Guess the name of the movie using as few plot keywords as possible!                                                                     | Movies/TV         |
| 131 | [Pokedoku](https://pokedoku.com/)                                                          | Fill out the grid with Pokémon matching the criteria of each cell's row and column.                                                     | Video Games       |
| 132 | [Polygonle](https://www.polygonle.com/)                                                    | Guess the word in 6 tries, like Wordle. Each unique shape over a column represents a letter.                                            | Words             |
| 133 | [PopCultured](https://histordle.com/popcultured/)                                          | Guess the year given three pop culture items released that year.                                                                        | Trivia            |
| 134 | [Primel](https://converged.yt/primel/)                                                     | Guess the 5-digit prime number in six guesses or less.                                                                                  | Math/Logic        |
| 135 | [Puckdoku](https://www.puckdoku.com/)                                                      | Fill out the grid with hockey players matching the criteria of each cell's row and column.                                              | Sports            |
| 136 | [Puzzmo - Crossword](https://www.puzzmo.com/play/crossword)                                | Crosswords without getting stuck.                                                                                                       | Words             |
| 137 | [Puzzmo - Flipart](https://www.puzzmo.com/play/flip-art)                                   | Rotate the pieces to fit them within the frame.                                                                                         | Miscellaneous     |
| 138 | [Puzzmo - Really Bad Chess](https://www.puzzmo.com/play/really-bad-chess)                  | Checkmate the opponent's king in this randomized Chess variant.                                                                         | Math/Logic        |
| 139 | [Puzzmo - Spelltower](https://www.puzzmo.com/play/spelltower)                              | Find words to clear tiles in the falling grid.                                                                                          | Words             |
| 140 | [Puzzmo - Typeshift](https://www.puzzmo.com/play/typeshift)                                | Slide columns of letters to make words, using all of the letters along the way.                                                         | Words             |
| 141 | [Quintessential](https://quintessential.fun/)                                              | Solve each of the 5 horizontal words in as few swaps as possible.                                                                       | Words             |
| 142 | [Quizl](https://quizl.io/)                                                                 | Answer today's 5 trivia questions.                                                                                                      | Trivia            |
| 143 | [Quordle](https://quordlegame.com/)                                                        | Solve 4 Wordle puzzles at the same time.                                                                                                | Words             |
| 144 | [Redactle](https://redactle.net/)                                                          | Guess the Wikipedia article by its content with keywords redacted.                                                                      | Words             |
| 145 | [regexle.com](https://regexle.com/)                                                        | Fill in the hexagon with sequences of characters that match the regular expressions listed around the edges.                            | Math/Logic        |
| 146 | [regexle.ithea.de](https://regexle.ithea.de/)                                              | Guess the secret regular expression by testing sequences of characters.                                                                 | Words             |
| 147 | [ReHeardle](https://reheardle.com/)                                                        | Guess the song from listening to small parts of it.                                                                                     | Music             |
| 148 | [ReHeardle Video Games](https://reheardle.com/videogames/)                                 | Guess the video game track from listening to small parts of it.                                                                         | Music             |
| 149 | [Relatle](https://www.relatle.lol/)                                                        | Guess the word based on one of its synonyms, given a new synonym after each guess.                                                      | Words             |
| 150 | [Rhyme Time](https://www.rhymetime.co/)                                                    | Guess the three words that all rhyme.                                                                                                   | Words             |
| 151 | [Rogule](https://rogule.com/game.html)                                                     | A daily emoji dungeon crawler roguelike.                                                                                                | Miscellaneous     |
| 152 | [Satle](https://satle.ca/)                                                                 | Guess the city given a satellite image, zooming out after each guess.                                                                   | Geography/History |
| 153 | [Semantle](https://semantle.com/)                                                          | Guess words to see how close they are to the secret word semantically, eventually guessing the secret word.                             | Words             |
| 154 | [Songle](https://histordle.com/songle/)                                                    | Guess the year given three songs that were released that year.                                                                          | Music             |
| 155 | [Songless](https://lessgames.com/songless)                                                 | Guess the song from listening to small parts of it.                                                                                     | Music             |
| 156 | [Spellcheck](https://spellcheck.xyz/)                                                      | Spell the words correctly after listening to them.                                                                                      | Words             |
| 157 | [Spellie](https://spelliegame.com/)                                                        | Wordle for young spellers with 3 difficulty modes.                                                                                      | Words             |
| 158 | [Spelling Bee](https://spellsbee.com/)                                                     | Given 7 letters, make as many words as you can that contain the center letter. Same as NYT Spelling Bee, which requires a subscription. | Words             |
| 159 | [Spotle](https://spotle.io/)                                                               | Guess the music artist in 10 tries, gaining new information based on each guess.                                                        | Music             |
| 160 | [Squardle](https://fubargames.se/squardle/)                                                | A complex Wordle variant where your guesses count in two directions and cycle between three positions.                                  | Words             |
| 161 | [Squares](https://squares.org/)                                                            | Find all of the words in this daily Boggle game.                                                                                        | Words             |
| 162 | [Stackle](https://www.stackle.fun/)                                                        | Build the tallest possible stack of words, swapping out one letter and scrambling the rest with each new word.                          | Words             |
| 163 | [Statele](https://statele.teuteuf.fr/)                                                     | Guess the US State by its outline on the map.                                                                                           | Geography/History |
| 164 | [Stepdle](https://www.stepdle.com/)                                                        | Solve 4 Wordle puzzles, one at a time, each word one letter longer than the last. You have 20 total guesses.                            | Words             |
| 165 | [Summle](https://summle.net/)                                                              | Reach the target number using the given numbers and operations. Includes a junior mode and hard mode.                                   | Math/Logic        |
| 166 | [Sumplete](https://sumplete.com/daily/)                                                    | Delete numbers so that each row and column adds up to their target number.                                                              | Math/Logic        |
| 167 | [Survivle](https://lazyguyy.github.io/survivle/)                                           | Try to lose the Wordle game by guessing 7 or more times, but you must utilize all gained information for each guess.                    | Words             |
| 168 | [Syllacrostic](https://www.syllacrostic.com/daily-puzzle)                                  | Combine syllables to solve the clues.                                                                                                   | Words             |
| 169 | [The Wikipedia Game](https://www.thewikipediagame.com/)                                    | Race from one Wikipedia page to the target page using as few links as possible                                                          | Words             |
| 170 | [Thirdle](https://thirdle.org/)                                                            | Solve 3 Wordle puzzles crossed together.                                                                                                | Words             |
| 171 | [Thrice](https://thrice.geekswhodrink.com/)                                                | Answer today's 5 trivia questions, each from a different category.                                                                      | Trivia            |
| 172 | [TimeGuessr](https://timeguessr.com/)                                                      | Guess the right time and location of each historical photo.                                                                             | Geography/History |
| 173 | [Toddle](https://toddle-puzzle.web.app/)                                                   | Guess the secret word or phrase, starting with a 4-letter word whose letters appear in the same order.                                  | Words             |
| 174 | [travle](https://travle.earth/)                                                            | Connect the starting country to the ending country by naming countries in between them.                                                 | Geography/History |
| 175 | [Triplets](https://www.tripletgame.com/)                                                   | Find as many triplets as you can in 3 minutes. A triplet is a set of 3 cards whose attributes are either all the same or all different. | Math/Logic        |
| 176 | [Twofer Goofer](https://twofergoofer.com/)                                                 | Guess the pair of rhyming words that form the given nonsensical phrase.                                                                 | Words             |
| 177 | [Unolingo](https://games.usatoday.com/games/uclick-unolingo)                               | Solve the clueless crossword by using each letter of the English alphabet exactly once.                                                 | Words             |
| 178 | [Unzoomed](https://www.unzoomed.com/en)                                                    | Guess the city based on the given satellite image.                                                                                      | Geography/History |
| 179 | [Weaver](https://weavergame.org/)                                                          | Weave your way from the start word to the end word, changing only one letter at a time.                                                 | Words             |
| 180 | [Where in the USA is this?](https://pudding.cool/games/where/)                             | Guess the location in the United States given 5 pictures of the same place, one at a time.                                              | Geography/History |
| 181 | [WhereTaken](https://wheretaken.teuteuf.fr/)                                               | Guess the Country/Region in which the photo was taken.                                                                                  | Geography/History |
| 182 | [WhereTaken USA](https://wheretakenusa.teuteuf.fr/)                                        | Guess the US State in which the photo was taken.                                                                                        | Geography/History |
| 183 | [Word Chase](https://wordchase.semantle.com/)                                              | Guess the secret word within 5 tries, receiving a new word as a hint before each guess.                                                 | Words             |
| 184 | [Word Connection](https://www.thewordfinder.com/word-connection/)                          | Link a chain of 4 relevant words together.                                                                                              | Words             |
| 185 | [Word Waffle](https://wordwaffle.org/)                                                     | Move letters to create words both horizontally and vertically.                                                                          | Words             |
| 186 | [WordAll](https://wordall.xyz/)                                                            | Guess all of the Wordle words, given the starting clues.                                                                                | Words             |
| 187 | [Wordga](https://wordga.com/daily)                                                         | Find as many 4+ letter words using today's letters.                                                                                     | Words             |
| 188 | [Wordless](https://lessgames.com/wordless)                                                 | Solve Wordle puzzles of various sizes.                                                                                                  | Words             |
| 189 | [Worldle](https://worldle.teuteuf.fr/)                                                     | Guess the country by its shape on the world map.                                                                                        | Geography/History |
| 190 | [Yeardle](https://histordle.com/yeardle/)                                                  | Guess the year based on the given historical events of that year.                                                                       | Geography/History |