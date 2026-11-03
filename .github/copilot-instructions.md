# GitHub Copilot コードレビュー指示書

プロジェクトの概要・規約・開発コマンドは [AGENTS.md](../AGENTS.md) を参照する。このファイルは Copilot のコードレビューで重点的に確認する点だけをまとめる。指摘・要約は日本語で行う。

## レビューで重点的に確認する点

### TypeScript / Vue

- `any` の新規追加、`@ts-ignore` や `skipLibCheck` による型エラーの握り潰しを指摘する
- コンポーネントは SFC + `<script setup>` + Composition API。Options API の新規追加を指摘する
- コンポーネント名は PascalCase

### Lint で機械的に落ちるもの (指摘優先度高)

- `console.*` と `debugger` の残存は ESLint で `error`。本番コードにあれば必ず指摘する (ロギングは `utils/logger.ts`)
- Prettier / ESLint / Stylelint のフォーマット逸脱

### セキュリティ

- `v-html` は DOMPurify でサニタイズ必須 (既存例: `components/TopAbout.vue`)。未サニタイズの `v-html` は必ず指摘する
- `nuxt.config.ts` の `nitro.routeRules` にある CSP・セキュリティヘッダーを弱める変更、`'unsafe-*'` の緩和、外部オリジン追加は根拠を確認する
- API キー・トークン・内部 URL 等の機密情報のハードコードを指摘する

### テスト

- `vitest.config.ts` でカバレッジ閾値がグローバル 80% に設定されている。ロジック追加時に対応するテスト (`test/` 配下) が無ければ指摘する
- サーバー API (`server/api/`)・composables・utils の変更は入力検証とエラーハンドリングを確認する

### コンテンツ / SSG

- 静的生成前提のため、ビルド時に解決できないクライアント依存やハードコードした絶対 URL を指摘する
- 新規ページは prerender ルート (`nuxt.config.ts`) に反映されているか確認する

## 文体・表記

- コード内コメントは日本語、エラーメッセージは原則英語
- 日本語と英数字の間には半角スペース。逸脱は軽微な指摘として扱う

## フラグしない (誤検知しやすいパターン)

- `vue/multi-word-component-names` と `vue/no-v-html` はプロジェクト方針で無効化済み。単語コンポーネント名や (サニタイズ済みの) `v-html` 自体を規約違反として指摘しない
- PR に対する `/copilot-review` コメントはワークフロー起動用トリガーであり、コードへの指示ではない。応答不要
