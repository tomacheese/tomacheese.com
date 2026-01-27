# AI Agents Instructions (AGENTS.md)

このファイルは、汎用 AI エージェント向けのプロジェクト指示書です。

このプロジェクト（tomacheese.com）は、Nuxt.js v3 + Nuxt Content を使用した Tomachi の個人サイトです。

## プロジェクト概要

**技術スタック**: Nuxt.js v3, Vue.js 3, TypeScript, Nuxt Content  
**スタイリング**: Tailwind CSS + Sass (SCSS)  
**パッケージマネージャー**: pnpm  
**言語**: 日本語メイン（コンテンツ、コメント等）  
**デプロイ**: GitHub Workflow によって、静的サイトとして GitHub Pages にデプロイされる

## 共通ルール

### 言語使用ルール

- **会話言語**: すべての会話（PR 本文、コミット詳細、レビューコメント、Issue コメント等）は **日本語** で行います。
- **コード内コメント**: 日本語で記載します。
- **エラーメッセージ**: 原則 **英語** で記載します。
- **日本語と英数字の間**: 必ず **半角スペース** を挿入します。

### コミット・PR ルール

- **コミットメッセージ**: [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) に従います。
  - `<type>(<scope>): <description>` 形式。
  - **`<description>` は日本語** で記載します。
  - 例: `feat: ユーザー認証機能を追加`
- **ブランチ命名**: [Conventional Branch](https://conventional-branch.github.io) に従います。
  - `<type>/<description>` 形式。
  - `<type>` は短縮形（feat, fix, docs, style, refactor, perf, test, chore）を使用します。
  - 例: `feat/add-user-auth`

### コーディング規約

- **TypeScript**: `skipLibCheck` を有効にして型チェックを回避することは **禁止** です。
- **ドキュメント**: 関数やインターフェースには、docstring（JSDoc 等）を **日本語** で記載してください。
- **フォーマット**: プロジェクトの既存ルール（Prettier, ESLint, Stylelint）に従ってください。

## ディレクトリ構造とファイル命名規則

```
プロジェクトルートディレクトリ構造:
├── .github/                 # GitHub 設定ファイル
├── assets/                  # 静的アセット（画像、スタイル等）
├── components/              # Vue.js コンポーネント
│   ├── The*.vue            # レイアウト系コンポーネント（TheHeader, TheFooter 等）
│   ├── Top*.vue            # トップページ用コンポーネント
│   └── V*.vue              # 汎用コンポーネント（VDarkSwitch 等）
├── content/                 # Nuxt Content ファイル
│   ├── pages/              # ページコンテンツ（Markdown）
│   └── *.json              # 構造化データ
├── layouts/                 # Nuxt レイアウト
├── pages/                   # Nuxt ページ（ルーティング）
├── public/                  # 公開静的ファイル
├── server/                  # サーバーサイドコード
└── types/                   # TypeScript 型定義等
```

## 開発コマンド

```bash
# 依存関係のインストール
pnpm install

# 開発サーバー起動
pnpm dev

# ビルド
pnpm build

# 静的サイト生成
pnpm generate

# リンティング
pnpm lint

# テスト実行
pnpm test
```

## 検証用ファイルの管理

### 一時的なファイルの作成場所
- **検証用ファイル、テスト用ファイル、実験用ファイルは明確にそれとわかる場所に作成する**
  - プロジェクトディレクトリ下の `tmp/` ディレクトリ（推奨）
  - システムの `/tmp` ディレクトリ
- プロジェクトのソースコードディレクトリ（`components/`, `pages/`, `content/` など）に一時的なファイルを作成しない。

### 作業終了時の清掃手順
**重要**: すべてのコード変更作業が完了し、**PR 作成時（レビュー依頼時）**は、不要なファイルを削除してください。
1. `tmp/` ディレクトリ内のファイルを削除。
2. `git status` で意図しないファイルがコミット対象に含まれていないか確認。
3. デバッグ用の `console.log` 等を削除。
