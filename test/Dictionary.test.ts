import ava, { TestFn } from 'ava'
import { Dictionary } from '../src/Dictionary.js'

const test = ava as TestFn<{ dictionary: Dictionary }>
test.before(t => {
  t.context.dictionary = Dictionary.from('./assets/dictionary.txt')
})

test('should read an empty file', t => {
  const dictionary = Dictionary.from('./assets/empty.txt')
  t.is(dictionary.size, 0)
})

test('should read file with non-words', t => {
  const dictionary = Dictionary.from('./assets/numbers.txt')
  t.is(dictionary.size, 1)
})

test('should add words in alphabetical order without duplicates', t => {
  const { dictionary } = t.context
  for (let i = 0; i < dictionary.words.length; i++) {
    // Get "this" and "that"
    const a = dictionary.words[i]; const b = dictionary.words[i + 1]
    if (b == null) {
      // End of the dictionary
      break
    }

    // Compare the two strings
    const compared = a.localeCompare(b)

    // Check for equality
    const isEqual = compared === 0
    if (isEqual) {
      t.fail(`"${a}" is equal to "${b}"`)
    }

    // Check for sort order
    const isNotSorted = compared > 0
    if (isNotSorted) {
      t.fail(`"${a}" is greater than "${b}"`)
    }
  }
  t.pass('Dictionary is in alphabetical order')
})

test('should lookup a word', t => {
  const { dictionary } = t.context
  t.true(dictionary.lookup('apple') > 0)
})

test('should suggests words that are similar', t => {
  const { dictionary } = t.context
  const suggestions = dictionary.suggest('misspellet')
  t.true(suggestions.length >= 3, 'There should be at least three suggestions')
  t.true(suggestions.every(suggestion => suggestion.startsWith('miss')), 'Every suggestion should start with miss')
})

test('should allow proper nouns', t => {
  const { dictionary } = t.context
  t.notThrows(() => dictionary.spellcheck('./assets/swallow.txt'))
})

test('should spellcheck a file with a mistake', t => {
  const { dictionary } = t.context
  t.throws(() => dictionary.spellcheck('./assets/spellcheck.txt'), { instanceOf: AggregateError })
})
