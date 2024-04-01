export class Token {
  constructor (
    public value: string = '',
    public line: number,
    public character: number = 0
  ) {
    if (line < 0) {
      throw TypeError('Line number cannot be less than zero.')
    }
    if (character < 0) {
      throw TypeError('Character number cannot be less than zero.')
    }
  }
}

export class TokenError extends Error {
  constructor (
    public readonly raw: string,
    public readonly token: Token,
    public readonly suggestions: string[] = []
  ) {
    const lineIndex = token.line - 1; const charIndex = token.character - 1
    const line = raw.split('\n')[lineIndex]

    let title = `Unknown word "${token.value}" at L${token.line}:${token.character}.`
    if (suggestions.length > 0) {
      // Add suggestions, if any
      title += ` Did you mean one of these? ${suggestions.join(', ')}`
    }
    const context = line + '\n' + new Array(charIndex).fill(' ').join('') + new Array(token.value.length).fill('^').join('')
    const message = `${title}\n\n${context}`

    super(message)
  }
}
