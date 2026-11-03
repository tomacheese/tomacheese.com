# AGENTS.md

Tomachi の個人サイト `tomacheese.com` のリポジトリ。Nuxt 4 + Nuxt Content で構築し、`nuxt generate` による静的サイトとして GitHub Pages にデプロイする。

## 言語ルール

- コミットの description、PR・Issue のタイトルと本文、レビューコメント、コード内のコメント・JSDoc、ドキュメントは日本語で書く
- 日本語と英数字の間には半角スペースを入れる
- 例外: サイトの表示テキストやコンテンツ (`content/` 配下など)、引用、技術的な識別子、`package.json` (常に英語)
- エラーメッセージは原則として英語

## コミット・ブランチ規約

- コミットメッセージは [Conventional Commits](https://www.conventionalcommits.org/) に従う (`commitlint.config.js` に設定あり)
- ブランチは [Conventional Branch](https://conventional-branch.github.io) の短縮 type (`feat`、`fix`、`docs`、`chore` など) で `<type>/<description>` とする

## 技術スタック

- フレームワーク: Nuxt 4 / Vue 3 / TypeScript (`ssr: true` + `nuxt generate` によるプリレンダリング)
- UI・スタイル: Nuxt UI 4 (Tailwind CSS v4 ベース) + Sass (SCSS)。独立した `tailwind.config` は持たない
- コンテンツ: Nuxt Content 3 (`better-sqlite3` バックエンド)
- その他のモジュール: `@nuxt/fonts`、`@vueuse/nuxt`、`nuxt-gtag`
- パッケージマネージャー: pnpm。Node のバージョンは `.node-version` で固定している

## 開発コマンド

```bash
pnpm install        # 依存関係のインストール (postinstall で nuxt prepare)
pnpm dev            # 開発サーバー
pnpm build          # ビルド
pnpm generate       # 静的サイト生成 (デプロイ成果物は .output/public/)
pnpm preview        # 生成物のプレビュー

pnpm lint           # lint:js + lint:style
pnpm lint:js        # ESLint
pnpm lint:style     # Stylelint (*.vue, *.css)
pnpm lintfix        # prettier --write + eslint --fix + stylelint --fix

pnpm test           # Vitest
pnpm test:watch     # Vitest (watch)
pnpm test:coverage  # カバレッジ付き
```

## ディレクトリ構成

```
├── assets/styles/main.scss   # グローバル SCSS (nuxt.config.ts の css で読み込み)
├── assets/variables.scss     # SCSS 変数 (どこからも参照されていない)
├── components/               # Vue コンポーネント (The* はレイアウト用 / Top* はトップページ用 / V* は汎用)
├── composables/              # useApi, useJsonld
├── content/                  # Nuxt Content。pages/*.md と構造化データの *.json
├── content.config.ts         # Content のコレクション定義
├── layouts/ pages/           # Nuxt のレイアウト / ルーティング
├── public/favicons/          # 公開する静的ファイル
├── server/api/               # サーバー API (devices, top-details, top-timelines)
├── test/                     # Vitest のテスト (対象ディレクトリごとに配置)
├── types/                    # TypeScript の型定義
├── utils/                    # formatters, logger, validation
├── nuxt.config.ts            # Nuxt 設定 (CSP・セキュリティヘッダー・prerender ルート)
└── vitest.config.ts          # テスト・カバレッジ設定
```

## コーディング規約

- Vue / Nuxt: SFC + `<script setup>` + Composition API。コンポーネント名は PascalCase
- TypeScript: `any` を避け、型安全を優先する。`skipLibCheck` で型エラーを回避しない。公開関数・インターフェースには日本語 JSDoc を付ける。インターフェースに `I` プレフィックスは付けない
- スタイル: Nuxt UI / Tailwind のユーティリティを基本とし、必要な分だけ SCSS を書く。コンポーネント内は `<style scoped>`、CSS クラス名は kebab-case
- ページの Markdown は `content/pages/` に置き、front matter に `title` などを設定する
- `no-console` と `no-debugger` は ESLint で `error`。本番コードに `console.*` / `debugger` を残さず、ロギングは `utils/logger.ts` を使う
- SSG のため、クライアント処理は最小限にし、SEO (メタタグ・構造化データ) とアクセシビリティ (セマンティック HTML・ARIA) を維持する

## テスト

- Vitest + `@vue/test-utils`、環境は happy-dom
- カバレッジ閾値は `vitest.config.ts` で 80% (branches / functions / lines / statements) に設定している
- 変更後は該当領域のテストを更新・追加し、`pnpm test` と `pnpm lint` を通す

## 守るべき不変条件

- `nuxt.config.ts` の `nitro.routeRules` で全ルートに CSP とセキュリティヘッダー (`X-Frame-Options`、`X-Content-Type-Options`、`Referrer-Policy`、`Strict-Transport-Security`) を付与している。ヘッダーや CSP を緩める変更 (`unsafe-*` の追加、外部オリジンの追加など) は慎重に行い、`test/security/headers.test.ts` を確認する
- `v-html` は必ず DOMPurify でサニタイズしてから使う (例: `components/TopAbout.vue`)。未サニタイズの `v-html` を追加しない
- `content/pages/*.md` は `nuxt.config.ts` が走査して prerender ルートへ自動で追加する。`pages/` に専用ページ (例: `/devices`) を追加した場合は、`nitro.prerender.routes` と `essentialRoutes` に反映する

## CI・デプロイ

- `deploy.yml` (master / main への push) は `pnpm lint`、`pnpm test`、`pnpm build`、`pnpm generate` を実行し、`.output/public/` を GitHub Pages に公開する
- PR では `nodejs-ci.yml` (Node CI) と `test-page-generation.yml` (生成ページの検証) が走る
- `lint-staged` と `commitlint` の設定はあるが、husky は v9 系で `package.json` の旧 v4 形式 `husky.hooks` を参照しないため、Git フックとしては機能していない。コミット前に手動で `pnpm lint` / `pnpm test` を通すこと
- コマンド・依存・ディレクトリ構成を変えたら、この `AGENTS.md` と `.github/copilot-instructions.md` の該当記述も更新する
- `AGENTS.md` は開発作業の指針、`.github/copilot-instructions.md` は Copilot コードレビュー用のチェックリスト。役割が違うため内容を丸ごと複製しない
