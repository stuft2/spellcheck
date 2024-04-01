import path from 'node:path'
import fs from 'node:fs'
import { Token } from './Token.js'

const LETTER_RX = /[a-z-]/
const NEW_LINE = '\n'

export class Lexer {
  static from (file: string): Lexer {
    const filePath = path.resolve(process.cwd(), file)
    const content = fs.readFileSync(filePath).toString()
    return new Lexer(content)
  }

  readonly tokens: Token[] = []
  constructor (public readonly raw: string) {
    // Optimize by converting to lowercase
    const text = raw.toLowerCase()
    let line = 1; let character = 0; let token: Token | null = null

    for (const char of text) {
      character++
      if (LETTER_RX.test(char)) {
        // Found a letter
        if (token == null) {
          // Initialize a new, empty token
          token = new Token('', line, character)
        }
        token.value += char
        continue
      }

      if (token != null) {
        // All other characters are token separators
        this.tokens.push(token)
        token = null
      }

      if (char === NEW_LINE) {
        // New line characters need to be counted
        line++
        character = 0
      }
    }

    if (token != null) {
      // Last token was at the end of the file
      this.tokens.push(token)
    }
  }
}
