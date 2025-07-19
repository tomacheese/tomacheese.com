# tomacheese.com v3

Nuxt.js v3 + Nuxt Content で構築された Tomachi Site のリニューアル版

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

## 🚀 デプロイ

### GitHub Pages（プロダクション）

master ブランチへの push により自動的に GitHub Pages にデプロイされます。

### Cloudflare Pages（プレビュー）

PR の作成・更新時に Cloudflare Pages にプレビューデプロイメントが作成されます。

**セットアップ手順:**

1. Cloudflare で新しい Pages プロジェクトを作成（プロジェクト名: `tomacheese-com-preview`）
2. Cloudflare API Token を生成（`Pages:Edit` 権限が必要）
3. GitHub Secrets に Cloudflare 認証情報を追加:
   - `CLOUDFLARE_API_TOKEN`: Cloudflare API Token
   - `CLOUDFLARE_ACCOUNT_ID`: Cloudflare の Account ID

**プレビュー URL 形式:**
```
https://pr-{PR 番号}.tomacheese-com-preview.pages.dev
```

**動作:**
- PR 作成・更新時: プレビューデプロイメント作成 + コメント投稿/更新
- PR 終了時: クリーンアップ通知コメント投稿
