<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="page-title">アニメ関連</h1>
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
<p>アニメに関する情報をまとめたページです。視聴したアニメや好きなジャンルなどを紹介しています。</p>

<h2>好きなジャンル</h2>

<ul>
<li><strong>日常系・ほのぼの系:</strong> ゆったりとした雰囲気のアニメを好みます</li>
<li><strong>スライスオブライフ:</strong> 何気ない日常を描いた作品</li>
<li><strong>コメディ:</strong> 楽しく観られる作品</li>
</ul>

<h2>印象に残っている作品</h2>

<h3>日常系・ほのぼの系</h3>

<ul>
<li>ゆるキャン△</li>
<li>けいおん!</li>
<li>ご注文はうさぎですか？</li>
<li>きんいろモザイク</li>
<li>NEW GAME!</li>
</ul>

<h3>その他</h3>

<ul>
<li>SHIROBAKO</li>
<li>女子高生の無駄づかい</li>
<li>天気の子</li>
</ul>

<h2>視聴環境</h2>

<p>主に以下のプラットフォームでアニメを視聴しています：</p>

<ul>
<li>各種動画配信サービス</li>
<li>地上波テレビ</li>
<li>BD/DVD</li>
</ul>

<h2>関連する趣味</h2>

<ul>
<li><strong>VOICEROID:</strong> 琴葉葵・紲星あかりが好き</li>
<li><strong>CeVIO:</strong> さとうささら、すずきつづみ、ONEが好き</li>
<li><strong>音楽:</strong> アニメ楽曲やキャラクターソング</li>
</ul>

<p><em>※ 視聴リストは随時更新予定です。</em></p>
`

// SEO
useSeoMeta({
  title: 'アニメ関連 - Tomachi Site',
  description: 'Tomachiが視聴したアニメや好きなジャンル、関連する趣味について紹介しています。',
  ogTitle: 'アニメ関連',
  ogDescription: 'Tomachiが視聴したアニメや好きなジャンル、関連する趣味について紹介しています。',
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