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

masterブランチへのpushにより自動的にGitHub Pagesにデプロイされます。

### Cloudflare Pages（プレビュー）

PRの作成・更新時にCloudflare Pagesにプレビューデプロイメントが作成されます。

**セットアップ手順:**

1. Cloudflareで新しいPagesプロジェクトを作成（プロジェクト名: `tomacheese-com-preview`）
2. Cloudflare API Tokenを生成（`Pages:Edit` 権限が必要）
3. GitHub SecretsにCloudflare認証情報を追加:
   - `CLOUDFLARE_API_TOKEN`: Cloudflare API Token
   - `CLOUDFLARE_ACCOUNT_ID`: CloudflareのAccount ID

**プレビューURL形式:**
```
https://pr-{PR番号}.tomacheese-com-preview.pages.dev
```

**動作:**
- PR作成・更新時: プレビューデプロイメント作成 + コメント投稿/更新
- PR終了時: クリーンアップ通知コメント投稿
