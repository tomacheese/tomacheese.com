# CLAUDE.md

Tomachi の個人サイト `tomacheese.com`。Nuxt 4 + Nuxt Content で構築し、静的サイトとして GitHub Pages にデプロイする。

## 技術スタック

- **フレームワーク**: Nuxt 4 (`nuxt` 4.x) / Vue 3 / TypeScript
- **UI・スタイル**: Nuxt UI 4 (`@nuxt/ui`、Tailwind CSS v4 ベース) + Sass (SCSS)。独立した `tailwind.config` は持たない
- **コンテンツ**: Nuxt Content 3 (`@nuxt/content`)。`better-sqlite3` バックエンド
- **主なモジュール**: `@nuxt/fonts`、`@vueuse/nuxt`、`nuxt-gtag`
- **パッケージマネージャー**: pnpm。Node は `.node-version` 固定 (24.x)
- **レンダリング**: `ssr: true` + `nuxt generate` によるプリレンダリング (SSG)

## 開発コマンド

```bash
pnpm install        # 依存関係インストール (postinstall で nuxt prepare)
pnpm dev            # 開発サーバー
pnpm build          # ビルド
pnpm generate       # 静的サイト生成 (デプロイ成果物)
pnpm preview        # 生成物のプレビュー

pnpm lint           # lint:js + lint:style
pnpm lint:js        # ESLint
pnpm lint:style     # Stylelint (*.vue, *.css)
pnpm lintfix        # prettier --write + eslint --fix + stylelint --fix

pnpm test           # Vitest
pnpm test:watch     # Vitest watch
pnpm test:coverage  # カバレッジ付き
```

## ディレクトリ構成

```
├── assets/styles/main.scss   # グローバル SCSS (nuxt.config の css で読み込み)
├── assets/variables.scss     # SCSS 変数
├── components/               # Vue コンポーネント (The* レイアウト系 / Top* トップ用 / V* 汎用)
├── composables/              # useApi, useJsonld 等
├── content/                  # Nuxt Content。pages/*.md と *.json (構造化データ)
├── content.config.ts         # Content コレクション定義
├── layouts/ pages/           # Nuxt レイアウト / ルーティング
├── public/favicons/          # 公開静的ファイル
├── server/api/               # サーバー API (devices, top-details, top-timelines)
├── types/                    # TypeScript 型定義
├── utils/                    # formatters, logger, validation
├── nuxt.config.ts            # Nuxt 設定 (CSP・セキュリティヘッダ・prerender ルート)
└── vitest.config.ts          # テスト・カバレッジ設定
```

## コーディング規約

- **Vue/Nuxt**: SFC + `<script setup>` + Composition API。コンポーネント名は PascalCase
- **TypeScript**: `any` を避け型安全を優先。`skipLibCheck` で型エラーを回避しない。公開関数・インターフェースには日本語 JSDoc を付ける。インターフェースは `I` プレフィックスなし
- **スタイル**: Nuxt UI / Tailwind ユーティリティを基本とし、必要な追加スタイルのみ SCSS。コンポーネント内は `<style scoped>`、CSS クラス名は kebab-case
- **コンテンツ**: ページ Markdown は `content/pages/` に置き、front matter に `title` 等を設定
- **ESLint で強制される制約**: `no-console` と `no-debugger` は `error`。本番コードに `console.*` / `debugger` を残さない (ロギングは `utils/logger.ts` を使う)

## テスト

- Vitest + `@vue/test-utils`、環境は happy-dom。テストは `test/` 配下 (`components/`, `composables/`, `pages/`, `server/`, `utils/`, `security/` 等に対応)
- `vitest.config.ts` でカバレッジ閾値をグローバル 80% (branches/functions/lines/statements) に設定済み。閾値を下回らないこと
- 変更後は該当領域のテストを更新・追加し、`pnpm test` と `pnpm lint` を通す

## セキュリティ

- `nuxt.config.ts` の `nitro.routeRules` で全ルートに CSP とセキュリティヘッダ (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Strict-Transport-Security`) を付与している。ヘッダや CSP を緩める変更は慎重に行い、`test/security/headers.test.ts` を確認する
- `v-html` を使う箇所は必ず DOMPurify でサニタイズする (例: `components/TopAbout.vue`)。未サニタイズの `v-html` を追加しない

## 言語・コミット規約

- 会話・PR 本文・レビュー・Issue コメントは日本語
- コード内コメントは日本語、エラーメッセージは原則英語
- 日本語と英数字の間には半角スペースを入れる
- コミット・PR タイトルは [Conventional Commits](https://www.conventionalcommits.org/)。`<description>` は日本語。`commitlint` (commit-msg フック) で検証される
- ブランチは [Conventional Branch](https://conventional-branch.github.io) の短縮 type (`feat`, `fix`, `docs`, `chore` 等) で `<type>/<description>`

## Git フック

- husky 経由。`pre-commit`: lint-staged (ESLint / Stylelint)。`commit-msg`: commitlint

## デプロイ

- `.github/workflows/deploy.yml` が `pnpm generate` の成果物を GitHub Pages に公開する
- SSG のためクライアント処理は最小限にし、SEO (メタタグ・構造化データ) とアクセシビリティ (セマンティック HTML・ARIA) を維持する

## ドキュメント更新ルール

- コマンド・依存・ディレクトリ構成を変えたら、この CLAUDE.md と `.github/copilot-instructions.md` の該当記述も更新する
- CLAUDE.md は開発作業の指針、`.github/copilot-instructions.md` は Copilot コードレビュー用。役割が違うため内容を丸ごと複製しない
