import { compareTwoStrings as similarity } from 'string-similarity'
import { binaryInsert as insert } from 'binary-insert'
import search from 'binary-search'
import { Lexer } from './Lexer.js'
import { TokenError } from './Token.js'

const ALPHASORT_COMPARE = (a: string, b: string): number => a.localeCompare(b)

const SIMILARITY_THRESHOLD = 0.72

export class Dictionary {
  public readonly words: string[] = []
  static from (file: string): Dictionary {
    const lexer = Lexer.from(file)

    const dictionary = new Dictionary()
    for (const token of lexer.tokens) {
      dictionary.add(token.value)
    }

    return dictionary
  }

  get size (): number {
    return this.words.length
  }

  add (word: string): this {
    insert(this.words, word, ALPHASORT_COMPARE)
    return this
  }

  lookup (word: string): number {
    return search(this.words, word, ALPHASORT_COMPARE)
  }

  suggest (word: string): string[] {
    return this.words.filter(cursor => similarity(word, cursor) > SIMILARITY_THRESHOLD)
  }

  spellcheck (file: string): true {
    const lexer = Lexer.from(file)
    const errors: TokenError[] = []
    for (const token of lexer.tokens) {
      const found = this.lookup(token.value) >= 0
      if (!found) {
        const suggestions = this.suggest(token.value)
        errors.push(new TokenError(lexer.raw, token, suggestions))
      }
    }
    if (errors.length > 0) {
      throw new AggregateError(errors, 'Oops! Found some mistakes in your file!')
    }
    return true
  }
}
