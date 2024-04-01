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

try {
  console.info() // adding an extra line in the console for readability
  Dictionary.from(cli.input.at(0)).spellcheck(cli.input.at(1))
  console.info(`Looks perfect! ✨`)
} catch (e) {
  if (!(e instanceof AggregateError)) {
    // An unknown error occurred
    throw e
  }
  for (const error of e.errors) {
    console.error(error.message, '\n')
  }
}

