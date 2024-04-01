#!/usr/bin/env node
import meow from 'meow'
import { Dictionary } from '../dist/Dictionary.js'

const cli = meow(`
\tUsage
\t  $ spellchecker <dictionary_file> <file_to_check>

\tExamples
\t  $ spellchecker assets/dictionary.txt assets/spellcheck.txt
`, {
  importMeta: import.meta
})

Dictionary.from(cli.input.at(0))
  .spellcheck(cli.input.at(1))
