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

test('should throw on unknown words', t => {
  const lexer = new Lexer(`African swallows, specifically those of the Hirundo rustica species, are fascinating creatures known for their
remarkable migratory journeys. These birds exhibit remarkable aerial prowess, showcasing agility and speed that have
inspired numerous anecdotes. Interestingly, their sexes are virtually indistinguishable, a characteristic not commonly
found in many avian species. Their unique nest-building technique, using mud as a primary constructing material,
further underscores their adaptability and tenacity in various habitats.`)

  t.is(lexer.tokens.length, 68)
})
