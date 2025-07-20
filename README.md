# tomacheese.com v3

Nuxt.js v3 + Nuxt Content で構築された Tomachi Site のリニューアル版

## 🤖 Auto Copilot Review Response

このリポジトリには、Copilot のレビューコメントに自動で応答するワークフローが組み込まれています。

### 🚀 トリガー方法

#### 1. 自動実行（推奨）
- Copilot がプルリクエストにレビューを投稿すると自動で実行されます
- レート制限により、1時間に1回までの実行に制限されています

#### 2. コメントでの手動実行
- プルリクエストに `/copilot-review` とコメントすることで手動実行できます
- レート制限により、1時間に1回までの実行に制限されています

#### 3. Actions タブからの手動実行
- Actions タブ → "Auto Copilot Review Response" → "Run workflow" から実行
- レート制限を無視して即座に実行されます

### 📋 機能

- Copilot のレビューコメントとインラインコメントを自動収集
- 指摘事項をまとめた返信コメントを自動生成
- 重複実行を防ぐレート制限機能
- 複数のトリガー方法に対応

## 🛠️ 開発

### 依存関係のインストール

```bash
pnpm install
```

### 開発サーバー起動

```bash
pnpm dev
```

### ビルド（SPA）

```bash
pnpm generate
```
