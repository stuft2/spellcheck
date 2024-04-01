# Spellcheck

## Overview

A program that checks spelling. The input to the program is a dictionary file containing a list of valid words and a file containing the text to be checked.

## Prerequisites
1. [Install Node.js v16+](https://nodejs.org)
2. Install dependencies: `npm ci`
3. Build distribution files: `npm run build`
4. Link locally `npm link`

## Usage
```sh
spellcheck assets/dictionary.txt assets/spellcheck.txt
# output here
```

## Development
1. Format the code: `npm run lint:fix`
2. Run the tests: `npm test`
3. Build the distribution code: `npm run build`
