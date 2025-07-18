# GitHub Copilot Instructions

このプロジェクト（tomacheese.com）は、Nuxt.js v3 + Nuxt Content を使用したTomachiの個人サイトです。以下のガイドラインに従って開発を行ってください。

## プロジェクト概要

- **技術スタック**: Nuxt.js v3, Vue.js 3, TypeScript, Nuxt Content
- **スタイリング**: Tailwind CSS + Sass (SCSS)
- **パッケージマネージャー**: pnpm
- **言語**: 日本語メイン（コンテンツ、コメント、変数名等）
- **デプロイ**: 静的サイト生成（SSG）対応

## コミュニケーション規約

### 基本ルール
- **すべての会話は日本語で行う**（PR本文、コミット詳細、レビューコメント、Issue コメント等）
- **PRタイトルは英語で記載**し、Conventional Commits仕様に準拠する
- **コミットメッセージは英語**で、Conventional Commits仕様に準拠する

### Conventional Commits仕様
以下の形式でコミットメッセージとPRタイトルを作成してください：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**主要なtype:**
- `feat`: 新機能追加
- `fix`: バグ修正
- `docs`: ドキュメントのみの変更
- `style`: コードの意味に影響しない変更（空白、フォーマット、セミコロン等）
- `refactor`: バグ修正でも機能追加でもないコードの変更
- `perf`: パフォーマンス向上のための変更
- `test`: テストの追加・修正
- `chore`: ビルドプロセスや補助ツールの変更

**例:**
- `feat: add new anime page component`
- `fix: resolve header navigation mobile layout issue`
- `docs: update README installation instructions`

## ディレクトリ構造とファイル命名規則

```
/
├── .github/                 # GitHub設定ファイル
├── assets/                  # 静的アセット（画像、スタイル等）
├── components/              # Vue.jsコンポーネント
│   ├── The*.vue            # レイアウト系コンポーネント（TheHeader, TheFooter等）
│   ├── Top*.vue            # トップページ用コンポーネント
│   └── V*.vue              # 汎用コンポーネント（VDarkSwitch等）
├── content/                 # Nuxt Contentファイル
│   ├── pages/              # ページコンテンツ（Markdown）
│   └── *.json              # 構造化データ
├── layouts/                 # Nuxtレイアウト
├── pages/                   # Nuxtページ（ルーティング）
├── public/                  # 公開静的ファイル
├── server/                  # サーバーサイドコード
└── src/                     # TypeScript型定義等
```

## コーディング規約

### Vue.js / Nuxt.js
- **Single File Component (SFC)** 形式を使用
- `<script setup>` 構文を優先使用
- Composition API を使用
- TypeScript を必須とする
- コンポーネント名は PascalCase で命名

### TypeScript
- 型安全性を重視し、`any` 型の使用を避ける
- 適切な型定義を `src/types/` に配置
- インターフェースは `I` プレフィックスなしで命名

### スタイリング
- **Tailwind CSS** を基本とし、カスタムスタイルは **Sass (SCSS)** で記述
- `assets/styles/main.scss` にグローバルスタイル
- コンポーネントレベルのスタイルは `<style scoped>` 内に記述
- CSS クラス名は kebab-case で命名

### Nuxt Content
- Markdownファイルは `content/pages/` に配置
- Front matter で `title` 等のメタデータを設定
- 日本語コンテンツをメインとする

## 品質管理

### リンティング・フォーマッティング
以下のツールが設定済みです：
- **ESLint**: JavaScript/TypeScript コード品質
- **Stylelint**: CSS/SCSS スタイル品質
- **Prettier**: コードフォーマッティング
- **commitlint**: コミットメッセージ検証

### 実行コマンド
```bash
pnpm lint          # 全体リンティング
pnpm lint:js       # JavaScript/TypeScript リンティング
pnpm lint:style    # CSS/SCSS リンティング
pnpm lintfix       # 自動修正
```

### Git Hooks
- **pre-commit**: lint-staged によるリンティング
- **commit-msg**: commitlint による コミットメッセージ検証

## 開発フロー

### セットアップ
```bash
pnpm install       # 依存関係インストール
pnpm dev          # 開発サーバー起動
pnpm build        # プロダクションビルド
pnpm generate     # 静的サイト生成
```

### コード変更時の注意点
1. **最小限の変更**を心がける
2. **既存のコンポーネント構造**を理解してから変更
3. **日本語コンテンツ**の文脈を考慮
4. **レスポンシブデザイン**を維持
5. **SEO対応**（meta tags, structured data等）を考慮

### PR作成時の注意点
1. PRタイトルは英語でConventional Commits形式
2. PR説明は日本語で詳細に記載
3. 変更内容の動作確認を実施
4. リンティングエラーがないことを確認
5. 既存機能への影響がないことを確認

## 特記事項

### パフォーマンス
- 静的サイト生成（SSG）対応のため、クライアントサイドの処理を最小限に
- 画像最適化を考慮
- Core Web Vitals を意識したパフォーマンス

### アクセシビリティ
- セマンティックHTMLを使用
- キーボードナビゲーション対応
- 適切なARIAラベル設定

### SEO
- 適切なメタタグ設定
- 構造化データ対応
- sitemap.xml 自動生成対応

このガイドラインに従って、品質の高いコードを書き、プロジェクトの一貫性を保ってください。