# GitHub Copilot Instructions

このプロジェクト（tomacheese.com）は、Nuxt.js v3 + Nuxt Content を使用した Tomachi の個人サイトです。以下のガイドラインに従って開発を行ってください。

## プロジェクト概要

- **技術スタック**: Nuxt.js v3, Vue.js 3, TypeScript, Nuxt Content
- **スタイリング**: Tailwind CSS + Sass (SCSS)
- **パッケージマネージャー**: pnpm
- **言語**: 日本語メイン（コンテンツ、コメント等）
- **デプロイ**: GitHub Workflow によって、静的サイトとして GitHub Pages にデプロイされる

## コミュニケーション規約

### 基本ルール

- **すべての会話は日本語で行う**（PR 本文、コミット詳細、レビューコメント、Issue コメント等）
- **PR タイトルは英語で記載**し、Conventional Commits 仕様に準拠する
- **コミットメッセージは英語**で、Conventional Commits 仕様に準拠する

### Conventional Commits 仕様

以下の形式でコミットメッセージと PR タイトルを作成してください。

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**主要な type:**

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
└── src/                     # TypeScript 型定義等
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

- Markdown ファイルは `content/pages/` に配置
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
- **commit-msg**: commitlint によるコミットメッセージ検証

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
5. **SEO 対応**（meta tags, structured data 等）を考慮

### PR 作成時の注意点

1. PR タイトルは英語で Conventional Commits 形式
2. PR 説明は日本語で詳細に記載
3. 変更内容の動作確認を実施
4. リンティングエラーがないことを確認
5. 既存機能への影響がないことを確認
6. **検証用ファイルやテスト用ファイルを削除**（詳細は後述）

## 特記事項

### パフォーマンス

- 静的サイト生成（SSG）対応のため、クライアントサイドの処理を最小限に
- 画像最適化を考慮
- Core Web Vitals を意識したパフォーマンス

### アクセシビリティ

- セマンティック HTML を使用
- キーボードナビゲーション対応
- 適切な ARIA ラベル設定

### SEO

- 適切なメタタグ設定
- 構造化データ対応

このガイドラインに従って、品質の高いコードを書き、プロジェクトの一貫性を保ってください。

## 検証用ファイルの管理

### 一時的なファイルの作成場所

- **検証用ファイル、テスト用ファイル、実験用ファイルは必ず `/tmp` ディレクトリに作成する**
- プロジェクトのルートディレクトリやソースコードディレクトリに一時的なファイルを作成しない
- `/tmp` ディレクトリ内にサブディレクトリを作成して整理することを推奨

### 作業終了時の清掃手順

**重要**: すべてのコード変更作業が完了した際は、以下の手順で不要なファイルを削除する：

1. **一時的なファイルの確認**
   ```bash
   # /tmp ディレクトリ内の作成したファイルを確認
   ls -la /tmp/
   ```

2. **検証用ファイルの削除**
   ```bash
   # 作成した検証用ファイルを削除
   rm -rf /tmp/test-* /tmp/verify-* /tmp/experiment-*
   ```

3. **git status での最終確認**
   ```bash
   # コミット対象を確認し、不要なファイルが含まれていないかチェック
   git status
   git diff --name-only
   ```

4. **.gitignore の活用**
   - 永続的に除外すべきファイルパターンがある場合は `.gitignore` に追加
   - 一時的なファイルが誤ってコミット対象に含まれることを防ぐ

### PR作成前の最終チェックリスト

- [ ] `/tmp` ディレクトリに作成した不要なファイルをすべて削除した
- [ ] `git status` で意図しないファイルがコミット対象に含まれていないことを確認した
- [ ] 検証用コードがプロダクションコードに残っていないことを確認した
- [ ] テスト用の console.log や debug コードを削除した
- [ ] 実際に必要な変更のみがコミット対象となっていることを確認した

### 許可されるファイルの例外

以下のファイルは検証・テスト目的であってもプロジェクトに残すことが許可される：

- 正式なテストファイル（`*.test.ts`, `*.spec.ts` など）
- ドキュメント用のサンプルコード
- 設定ファイルの改善
- 開発環境の改善に関するファイル

### 禁止される行為

- プロジェクトのソースコードディレクトリに検証用ファイルを作成すること
- 一時的なファイルをコミット対象に含めること
- 実験用のコードを本番用コードに混入させること
- debug コードや console.log を本番用コードに残すこと
