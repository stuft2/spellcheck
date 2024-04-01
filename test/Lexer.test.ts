import test from 'ava'
import { Lexer } from '../src/Lexer.js'

test('should read in only groups of letters as tokens', t => {
  const lexer = new Lexer(` a   r   g g  df fgffgfgfg

;!asd'kfj hello a;sdfjfjdk   j     (asdf)

%^#@!*=_~/
a

hi`)

  t.is(lexer.tokens.length, 15)
})

test('should parse whole paragraphs', t => {
  const lexer = Lexer.from('assets/swallow.txt')
  t.is(lexer.tokens.length, 70)
})
