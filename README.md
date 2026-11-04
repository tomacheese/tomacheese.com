# tomacheese.com

Nuxt 4 + Nuxt Content で構築した Tomachi Site。静的サイトとして GitHub Pages にデプロイする。開発の規約は [AGENTS.md](AGENTS.md) を参照。

## 🤖 Auto Copilot Review Response

このリポジトリには、Copilot のレビューコメントに手動で応答するワークフローが組み込まれています。

### 🚀 トリガー方法

#### 1. コメントでの手動実行

- プルリクエストに `/copilot-review` とコメントすることで手動実行できます

#### 2. Actions タブからの手動実行

- Actions タブ → "Auto Copilot Review Response" → "Run workflow" から実行

### 📋 機能

- Copilot のレビューコメントとインラインコメントを自動収集
- 指摘事項をまとめた返信コメントを自動生成
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

### 静的サイト生成 (SSG)

```bash
pnpm generate
```

成果物は `.output/public/` に出力される。
