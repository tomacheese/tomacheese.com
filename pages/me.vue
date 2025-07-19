<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="page-title">私（Tomachi）について</h1>
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
// Temporarily hard-code the content to fix the navigation issue
// This can be replaced with proper content loading once the compatibility issue is resolved
const content = `
<p><a href="/devices">所持端末 (PC構成一覧)</a></p>

<h2>概要</h2>

<ul>
<li>趣味 &amp; 業務（お仕事）プログラマ。</li>
<li>Minecraftを数年にわたってプレイ・サーバ運営していた</li>
<li>エンジョイ勢ゲーマー</li>
<li>アニメはほのぼの系(日常系)を好む</li>
<li>「VOICEROID+ 琴葉 茜・葵 (ダウンロード版)」を所持（2018/09/29購入）</li>
<li>VOICEROIDでは琴葉葵・紲星あかり、CeVIOではさとうささら、すずきつづみ、ONEが好き</li>
<li>チンアナゴ・ニシキアナゴ好き</li>
</ul>

<h2>端末等</h2>

<p>PCを含む所持端末に関しては別ページでまとめています: <a href="/devices">所持端末</a></p>

<h2>好きなもの</h2>

<ul>
<li>Computer</li>
<li>Anime</li>
<li>Book / Comic</li>
<li>Camera</li>
<li>Music</li>
<li>Game</li>
<li>Programming</li>
</ul>

<h3>Programming</h3>

<p>以下の言語をある程度使えます（当然完全ではない）。</p>

<ul>
<li>PHP</li>
<li>Java</li>
<li>JavaScript
<ul>
<li>TypeScript</li>
<li>Vue.js</li>
<li>Nuxt.js</li>
</ul></li>
<li>C#</li>
<li>NodeJS</li>
<li>Python</li>
<li>Golang</li>
</ul>

<p>このサイトは Nuxt.js + TypeScript + Nuxt Content で制作・運用しています。フロントエンドのソースコードは <a href="https://github.com/tomacheese/tomacheese.com">tomacheese/tomacheese.com</a> にあります。</p>
`

// SEO
useSeoMeta({
  title: '私（Tomachi）について - Tomachi Site',
  description: 'Tomachiの自己紹介・プロフィールページです。趣味や技術スタック、好きなものなどを紹介しています。',
  ogTitle: '私（Tomachi）について',
  ogDescription: 'Tomachiの自己紹介・プロフィールページです。趣味や技術スタック、好きなものなどを紹介しています。',
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

    ul {
      list-style-type: circle;

      ul {
        list-style-type: square;
      }
    }
  }

  ol {
    list-style-type: decimal;

    ol {
      list-style-type: lower-alpha;

      ol {
        list-style-type: lower-roman;
      }
    }
  }

  li {
    margin-bottom: var(--space-2);
    color: var(--color-text-secondary);
  }

  blockquote {
    border-left: 4px solid var(--color-primary);
    padding-left: var(--space-4);
    margin: var(--space-6) 0;
    font-style: italic;
    color: var(--color-text-secondary);
    background-color: var(--color-surface);
    padding: var(--space-4);
    border-radius: var(--radius-md);
  }

  pre {
    background: var(--color-gray-100);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-4);
    overflow-x: auto;
    margin: var(--space-4) 0;
    font-size: var(--text-sm);

    .dark-theme & {
      background: var(--color-gray-900);
      border-color: var(--color-gray-700);
      color: var(--color-gray-100);
    }
  }

  code {
    background: var(--color-gray-100);
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-sm);
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 0.9em;

    .dark-theme & {
      background: var(--color-gray-800);
      color: var(--color-gray-100);
    }
  }

  pre code {
    background: none;
    padding: 0;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: var(--radius-md);
    margin: var(--space-4) 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: var(--space-4) 0;
  }

  th,
  td {
    border: 1px solid var(--color-border);
    padding: var(--space-3);
    text-align: left;
  }

  th {
    background: var(--color-primary);
    color: white;
    font-weight: 600;
  }
}
</style>