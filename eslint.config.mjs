import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: {
    typescript: true,
    vue: true,
  },
}).append({
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/no-v-html': 'warn', // v-htmlの使用は警告のみ（Nuxt Contentで必要）
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn', // anyの使用は警告のみ
    '@typescript-eslint/consistent-type-imports': 'off', // type-checkingルールは無効化
    '@typescript-eslint/ban-ts-comment': 'warn', // ts-commentは警告のみ
    'no-console': 'warn', // 本番環境でのconsole.log対策
  },
})
