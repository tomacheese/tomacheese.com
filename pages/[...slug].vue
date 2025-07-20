<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="page-title">{{ article?.title }}</h1>
        </div>
      </div>
    </section>

    <div class="container">
      <div class="content-layout">
        <main class="main-content">
          <article v-if="article" class="content-container">
            <ContentRenderer :value="article" />
          </article>
        </main>

        <aside class="sidebar-content">
          <TheSidebar :toc="article?.body?.toc?.links" />
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isValidArticle } from '~/utils/validation'

const route = useRoute()
let slug = route.params.slug as string | string[]

// Handle slug array (catch-all route)
if (Array.isArray(slug)) {
  slug = slug.join('/')
}

// Handle special slug mappings (from original site)
if (slug === 'pc') slug = 'devices'

// Redirect devices to the dedicated static page
if (slug === 'devices') {
  await navigateTo('/devices', { redirectCode: 301 })
}

// Use Nuxt Content v3 syntax with correct schema
const { data: article, error } = await useLazyAsyncData(`content-${slug}`, async () => {
  try {
    // Query by path using the correct field name
    const result = await queryCollection('content').where('path', '=', `/pages/${slug}`).first()
    
    if (isValidArticle(result)) {
      return result
    }
    
    return null
  } catch (err) {
    console.error(`[Content] Error fetching content for ${slug}:`, err)
    return null
  }
})

if (error.value || !article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

// SEO
useSeoMeta({
  title: `${article.value.title} - Tomachi Site`,
  description: article.value.description || `${article.value.title}についてのページ`,
  ogTitle: article.value.title,
  ogDescription: article.value.description || `${article.value.title}についてのページ`,
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

.page-description {
  font-size: var(--text-xl);
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
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
