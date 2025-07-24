# Claude Code Instructions

このファイルは Claude Code 向けのプロジェクト指示書です。

このプロジェクト（tomacheese.com）は、Nuxt.js v3 + Nuxt Content を使用した Tomachi の個人サイトです。

## プロジェクト概要

**技術スタック**: Nuxt.js v3, Vue.js 3, TypeScript, Nuxt Content  
**スタイリング**: Tailwind CSS + Sass (SCSS)  
**パッケージマネージャー**: pnpm  
**言語**: 日本語メイン（コンテンツ、コメント等）  
**デプロイ**: GitHub Workflow によって、静的サイトとして GitHub Pages にデプロイされる

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

## コーディング規約

### Vue.js / Nuxt.js

- **Single File Component (SFC)** 形式を使用
- `<script setup>` 構文を優先使用
- Composition API を使用
- TypeScript を必須とする
- コンポーネント名は PascalCase で命名

### TypeScript

- 型安全性を重視し、`any` 型の使用を避ける
- 適切な型定義を `types/` に配置
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

### テスト

プロジェクトには包括的なテストスイートが導入されています：

- **Vitest + Vue Test Utils**: テスト実行環境
- **カバレッジ要件**: **全ファイルで 80% 以上のカバレッジを必須とする**
- **対象ファイル**: TypeScript、Vue コンポーネント、サーバー API

```bash
pnpm test           # テスト実行
pnpm test:watch     # ウォッチモードでテスト実行
pnpm test:coverage  # カバレッジレポート付きテスト実行
```

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
6. **検証用ファイルやテスト用ファイルを削除**

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

## 検証用ファイルの管理

### 一時的なファイルの作成場所

- **検証用ファイル、テスト用ファイル、実験用ファイルは明確にそれとわかる場所に作成する**
  - プロジェクトディレクトリ下の `tmp/` ディレクトリ（推奨）
  - システムの `/tmp` ディレクトリ
- プロジェクトのソースコードディレクトリ（`components/`, `pages/`, `content/` など）に一時的なファイルを作成しない
- 一時ファイル用ディレクトリ内にサブディレクトリを作成して整理することを推奨

### 作業終了時の清掃手順

**重要**: すべてのコード変更作業が完了し、**PR 作成時（レビュー依頼時）**は、以下の手順で不要なファイルを削除する：

1. **一時的なファイルの確認**

   ```bash
   # プロジェクト内の tmp ディレクトリを確認
   ls -la ./tmp/
   # または システムの /tmp ディレクトリを確認
   ls -la /tmp/
   ```

2. **検証用ファイルの削除**

   ```bash
   # プロジェクト内の tmp ディレクトリを削除（確認付き）
   find ./tmp/ -type f -exec rm -i {} \;
   # または システムの /tmp 内の作成したファイルを削除（安全な方法）
   find /tmp -type f \( -name "test-*" -o -name "verify-*" -o -name "experiment-*" \) -delete
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

### PR 作成前の最終チェックリスト

- [ ] プロジェクト内の `tmp/` ディレクトリや作成した一時ファイルをすべて削除した
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

- 一時的なファイルをコミット対象に含めること
- 実験用のコードを本番用コードに混入させること
- debug コードや console.log を本番用コードに残すこと

## 文書フォーマット規則

### 見出しと本文の間隔

全ての見出し（Heading）とその本文の間には、**必ず空白行を入れる**こと。

### 日本語と英数字の間のスペース

日本語と英数字の間には、**必ず半角スペースを入れる**こと。

例:
- ✅ 正しい: `Nuxt.js v3 を使用`
- ❌ 間違い: `Nuxt.js v3を使用`

## Claude Code 固有の注意事項

### 特徴的な機能の活用

- **ファイル横断的な理解**: プロジェクト全体の構造を把握し、関連ファイル間の依存関係を考慮して変更を提案する
- **複雑なロジックの説明**: コードの動作原理や設計思想を詳しく解説する
- **最適化提案**: パフォーマンスやメンテナンス性の向上につながる改善案を提示する

### 推奨する作業フロー

1. プロジェクト全体の理解を深める
2. 変更対象のファイルとその関連ファイルを確認
3. 型定義やインターフェースの整合性を検証
4. テストファイルの存在を確認し、必要に応じてテストも更新
5. 変更の影響範囲を明確にして提案

### コミュニケーション

- すべての説明は **日本語** で行う
- 技術的な詳細も含めて丁寧に説明する
- コードの変更理由と期待される効果を明示する

このガイドラインに従って、品質の高いコードを書き、プロジェクトの一貫性を保ってください。