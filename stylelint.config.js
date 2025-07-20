module.exports = {
  extends: ['stylelint-config-standard'],
  // Override configuration for Vue Single File Components (SFCs)
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html', // Required for parsing CSS within Vue SFCs
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
    'color-function-alias-notation': null,
    'alpha-value-notation': null,
    'font-family-name-quotes': null,
    'declaration-block-no-shorthand-property-overrides': null,
    'no-descending-specificity': null,
  },
}
