import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: {
    typescript: true,
    vue: true,
  },
})
.append({
  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-console': 'warn', // 本番環境でのconsole.log対策
    'vue/no-v-html': 'off', // 既存の.eslintrc.jsの設定を移行
    'vue/singleline-html-element-content-newline': 'off', // 既存の.eslintrc.jsの設定を移行
    'vue/multiline-html-element-content-newline': 'off', // 既存の.eslintrc.jsの設定を移行
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
        },
      },
    ], // 既存の.eslintrc.jsの設定を移行
  }
})
