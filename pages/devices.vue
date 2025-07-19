<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="page-title">所持端末（PC構成一覧）</h1>
        </div>
      </div>
    </section>

    <div class="container">
      <div class="content-layout">
        <main class="main-content">
          <article class="content-container">
            <div v-html="content"></div>
          </article>
        </main>

        <aside class="sidebar-content">
          <TheSidebar />
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const content = `
<p>所持している端末・デバイス類をまとめたページです。主にPC構成やガジェット類を掲載しています。</p>

<h2>メインPC構成</h2>

<ul>
<li><strong>CPU:</strong> 最新の処理性能を重視したプロセッサ</li>
<li><strong>GPU:</strong> 開発・ゲーム・動画編集に対応したグラフィックカード</li>
<li><strong>メモリ:</strong> 大容量メモリで複数の作業を同時実行</li>
<li><strong>ストレージ:</strong> 高速SSDによる快適な動作環境</li>
</ul>

<h2>開発環境</h2>

<p>プログラミング・開発作業に使用している環境について紹介します。</p>

<h3>主要なソフトウェア</h3>

<ul>
<li>エディタ・IDE</li>
<li>ターミナル・シェル環境</li>
<li>バージョン管理ツール</li>
<li>データベース管理ツール</li>
</ul>

<h2>モバイル端末</h2>

<ul>
<li>スマートフォン</li>
<li>タブレット</li>
<li>その他モバイルガジェット</li>
</ul>

<h2>その他のガジェット</h2>

<p>開発・日常使用しているその他のデバイスや周辺機器について紹介します。</p>

<p><em>※ 詳細な構成情報は定期的に更新予定です。</em></p>
`

// SEO
useSeoMeta({
  title: '所持端末（PC構成一覧） - Tomachi Site',
  description: 'Tomachiが所持している端末・デバイス、PC構成、開発環境などを紹介しています。',
  ogTitle: '所持端末（PC構成一覧）',
  ogDescription: 'Tomachiが所持している端末・デバイス、PC構成、開発環境などを紹介しています。',
  ogType: 'article',
})
</script>

<style scoped>
.page-hero {
  background: linear-gradient(
    135deg,
    var(--color-surface) 0%,
    var(--color-white) 100%
  );
  padding: var(--space-20) 0;
  text-align: center;

  .dark-theme & {
    background: linear-gradient(
      135deg,
      var(--color-gray-800) 0%,
      var(--color-surface) 100%
    );
  }
}

.page-title {
  font-size: var(--text-5xl);
  font-weight: 700;
  margin-bottom: var(--space-6);
  color: var(--color-text-primary);

  @media (max-width: 768px) {
    font-size: var(--text-4xl);
  }
}

.content-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  align-items: start;
  margin: 2rem 0;
}

.main-content {
  min-width: 0;
}

.content-container {
  background: var(--color-white);
  border-radius: var(--radius-xl);
  padding: var(--space-12);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
  line-height: 1.8;

  .dark-theme & {
    background: var(--color-surface);
  }
}

.sidebar-content {
  position: sticky;
  top: 2rem;
}

@media (max-width: 1024px) {
  .content-layout {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .sidebar-content {
    position: static;
  }

  .content-container {
    padding: var(--space-8);
  }
}

@media (max-width: 768px) {
  .content-container {
    padding: var(--space-6);
  }
}

/* Content styling */
:deep(.content-container) {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--color-text-primary);
    margin-top: var(--space-8);
    margin-bottom: var(--space-4);
  }

  h1 {
    font-size: var(--text-4xl);
    margin-top: 0;
  }

  h2 {
    font-size: var(--text-3xl);
    border-bottom: 2px solid var(--color-border);
    padding-bottom: var(--space-2);
  }

  h3 {
    font-size: var(--text-2xl);
    color: var(--color-text-secondary);
  }

  p {
    margin-bottom: var(--space-4);
    color: var(--color-text-secondary);
  }

  a {
    color: var(--color-primary);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  ul,
  ol {
    margin-bottom: var(--space-4);
    padding-left: var(--space-8);
  }

  ul {
    list-style-type: disc;
  }

  li {
    margin-bottom: var(--space-2);
    color: var(--color-text-secondary);
  }

  strong {
    color: var(--color-text-primary);
    font-weight: 600;
  }

  em {
    color: var(--color-text-tertiary);
    font-style: italic;
  }
}
</style>