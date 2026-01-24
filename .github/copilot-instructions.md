# Claude Code Instructions



## プロジェクトの目的

**技術スタック**: Nuxt.js v3, Vue.js 3, TypeScript, Nuxt Content  
**スタイリング**: Tailwind CSS + Sass (SCSS)  
**パッケージマネージャー**: pnpm  
**言語**: 日本語メイン（コンテンツ、コメント等）  
**デプロイ**: GitHub Workflow によって、静的サイトとして GitHub Pages にデプロイされる

## コーディング規約

### Vue.js / Nuxt.js

- **Single File Component (SFC)** 形式を使用
- `<script setup>` 構文を優先使用
- Composition API を使用
- TypeScript を必須とする
- コンポーネント名は PascalCase で命名

## プロジェクト構成

プロジェクト構成については README を確認してください。

## 開発コマンド

```bash
# 依存関係のインストール
pnpm install

# 開発
pnpm dev

# ビルド
pnpm build

# テスト
pnpm test

# Lint
pnpm lint
```

## 新機能実装時の注意事項

- 既存のコード構造とパターンを維持する
- 適切なテストを追加する
- ドキュメントを更新する
