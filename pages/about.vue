<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="page-title">このサイトについて</h1>
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
<p>このサイトは Tomachi (以下、運営者と記します)が運営するサイトです。Nuxt.js v3 + Nuxt Content の環境下で運用しています。</p>

<h2>運営者について</h2>

<p>運営者の解説については、<a href="/me">こちら</a> からご覧ください。</p>

<h2>免責事項</h2>

<p>当サイトに掲載した情報などについて、運営者は一切の責任を負わず、それによって発生した如何なる不利益についても責任は負いません。<br>
また、運営者は運営者の判断によって当サイトの一部もしくはすべての変更、または運営を中断・終了することができます。</p>

<h2>アクセス解析ツールの使用について</h2>

<p>当サイトにはアクセス解析ツールである「<code>Google Analytics</code>」を設置し解析しております。このため、Cookieなどを使用し、匿名で閲覧データ（IPアドレス、大まかな地域情報、アクセス先ページ、検索ワード、使用ブラウザ、リファラーなど）を収集しておりますが、個人を特定するものでありません。<br>
詳しくは <a href="https://www.google.com/analytics/terms/jp.html">Google Analytics の利用規約</a> をご確認ください。</p>

<h2>問い合わせ等について</h2>

<p>当サイトに関する問い合わせについては、<code>info[AT]tomacheese.com</code> (<code>[AT]</code>を<code>@</code>に置換) か <a href="https://twitter.com/book000">Twitter @book000</a> よりお願いいたします。</p>

<h2>寄付等について</h2>

<p>一応Paypal.MeのリンクとKyashのQRコードを置いておきます。<br>
<a href="https://paypal.me/tomacheese">PayPal.Me/tomacheese</a></p>
`

// SEO
useSeoMeta({
  title: 'このサイトについて - Tomachi Site',
  description: 'このサイトの運営者情報、免責事項、問い合わせ先などについて説明しています。',
  ogTitle: 'このサイトについて',
  ogDescription: 'このサイトの運営者情報、免責事項、問い合わせ先などについて説明しています。',
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
}
</style>