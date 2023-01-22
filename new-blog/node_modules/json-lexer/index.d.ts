declare namespace jsonLexer {
  type LexerTokenType =
    | 'whitespace'
    | 'punctuator'
    | 'string'
    | 'number'
    | 'literal';

  type PunctuationOpen = '{' | '[';
  type PunctuationClose = '}' | ']';
  type PunctuationColon = ':';
  type PunctuationNext = ',';
  type Punctuation =
    | PunctuationOpen
    | PunctuationClose
    | PunctuationColon
    | PunctuationNext;

  type WhitespaceToken =
    { type: 'whitespace', value: string, raw: string };
  type PunctuatorToken =
    { type: 'punctuator', value: Punctuation, raw: string };
  type StringToken =
    { type: 'string', value: string, raw: string };
  type NumberToken =
    { type: 'number', value: number, raw: string };
  type LiteralToken =
    { type: 'literal', value: boolean | null, raw: string };

  type AnyPrimitiveToken = StringToken | NumberToken | LiteralToken;

  type LexerToken =
    | WhitespaceToken
    | PunctuatorToken
    | StringToken
    | NumberToken
    | LiteralToken;

  type NonWhitespaceToken = Exclude< LexerToken, WhitespaceToken >;

  type LexerTokens = Array< LexerToken >;
}

declare const jsonLexer: {
  (json: string): jsonLexer.LexerTokens;
}

export = jsonLexer;
