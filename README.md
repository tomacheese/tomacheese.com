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

**必要な環境変数（GitHub Secrets）:**

- `CLOUDFLARE_API_TOKEN`: Cloudflare API Token（Pages:Edit権限が必要）
- `CLOUDFLARE_ACCOUNT_ID`: CloudflareのAccount ID

**プレビューURL形式:**
```
https://pr-{PR番号}.tomacheese-com-preview.pages.dev
```
