<template>
  <aside class="sidebar">
    <div v-if="toc && toc.length > 0" class="toc-container">
      <h3>Table Of Contents</h3>
      <ul class="toc-list">
        <li 
          v-for="item in toc" 
          :key="item.id" 
          :class="`toc-item ${item.depth}`"
        >
          <a 
            :href="`#${item.id}`" 
            class="toc-link"
            @click.prevent="scrollToElement(item.id)"
          >
            {{ item.text }}
          </a>
        </li>
      </ul>
    </div>

    <div class="links-container">
      <h3>Links</h3>
      <ul class="links-list">
        <li v-for="link in links" :key="link.title" class="link-item">
          <a 
            :href="link.url" 
            target="_blank" 
            rel="noopener"
            class="link"
          >
            <Icon :name="link.icon" size="20" />
            <span>{{ link.title }}</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
interface TocItem {
  id: string
  text: string
  depth: string
}

interface Link {
  icon: string
  title: string
  url: string
}

interface Props {
  toc?: TocItem[]
}

const _props = withDefaults(defineProps<Props>(), {
  toc: () => []
})

const links: Link[] = [
  {
    icon: 'mdi:twitter',
    title: 'Twitter',
    url: 'https://twitter.com/book000',
  },
  {
    icon: 'mdi:github',
    title: 'GitHub',
    url: 'https://github.com/book000',
  },
  {
    icon: 'mdi:post',
    title: 'Zenn.dev',
    url: 'https://zenn.dev/book000',
  },
  {
    icon: 'mdi:minecraft',
    title: 'jao Minecraft Server',
    url: 'https://jaoafa.com',
  },
]

function scrollToElement(id: string) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.sidebar {
  background: var(--color-white);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
  height: fit-content;
  position: sticky;
  top: 2rem;
  transition: all var(--transition-normal);
  
  .dark-theme & {
    background: var(--color-surface);
  }
}

.toc-container {
  margin-bottom: 2rem;
}

.toc-container h3,
.links-container h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--color-archive-title);
  text-align: center;
  font-size: 1.1rem;
}

.toc-list,
.links-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-item {
  margin: 0.5rem 0;
}

.toc-item.h3 {
  margin-left: 1rem;
}

.toc-item.h4 {
  margin-left: 2rem;
}

.toc-item.h5 {
  margin-left: 3rem;
}

.toc-item.h6 {
  margin-left: 4rem;
}

.toc-link {
  color: var(--color-maincolor);
  text-decoration: none;
  font-size: 0.9rem;
  line-height: 1.4;
  display: block;
  padding: 0.25rem 0;
  border-left: 2px solid transparent;
  padding-left: 0.5rem;
  margin-left: -0.5rem;
  transition: all 0.2s;
}

.toc-link:hover {
  color: var(--color-primary);
  border-left-color: var(--color-primary);
}

.link-item {
  margin: 0.75rem 0;
}

.link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-maincolor);
  text-decoration: none;
  padding: 0.5rem;
  border-radius: var(--radius-md);
  transition: all 0.2s;
}

.link:hover {
  color: var(--color-primary);
  background: var(--color-surface);
}

@media (max-width: 1024px) {
  .sidebar {
    position: static;
    margin-bottom: 2rem;
  }
}
</style>