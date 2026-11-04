module.exports = {
  extends: ['stylelint-config-standard'],
  // Vue SFC 向けの設定を上書きする
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html', // Vue SFC 内の CSS を解析するために必要
    },
  ],
  ignoreFiles: [
    'node_modules/**',
    '.nuxt/**',
    '.output/**',
    'dist/**',
    '**/*.scss',
  ],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep', 'global'],
      },
    ],
    'media-feature-range-notation': null,
    'color-function-notation': null,
    'alpha-value-notation': null,
    'font-family-name-quotes': null,
    'declaration-block-no-shorthand-property-overrides': null,
    'no-descending-specificity': null,
  },
}
