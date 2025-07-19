<template>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <NuxtLink to="/" class="logo">
          <span class="logo-text">Tomachi Site</span>
        </NuxtLink>

        <div class="nav-links">
          <div v-for="item in items" :key="item.title" class="nav-item">
            <NuxtLink
              v-if="!item.to.startsWith('http')"
              :to="item.to"
              class="nav-link"
              exact-active-class="router-link-active"
            >
              {{ item.title }}
            </NuxtLink>
            <a
              v-else
              :href="item.to"
              target="_blank"
              rel="noopener"
              class="nav-link"
            >
              {{ item.title }}
            </a>
          </div>

          <div class="nav-actions">
            <VDarkSwitch />
          </div>
        </div>

        <!-- Mobile menu button -->
        <button class="mobile-menu-btn" @click="toggleMobileMenu">
          <Icon :name="mobileMenuOpen ? 'mdi:close' : 'mdi:menu'" size="24" />
        </button>
      </nav>

      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="mobile-menu">
        <component
          v-for="item in items"
          :key="item.title"
          :is="item.to.startsWith('http') ? 'a' : 'NuxtLink'"
          :to="item.to.startsWith('http') ? undefined : item.to"
          :href="item.to.startsWith('http') ? item.to : undefined"
          :target="item.to.startsWith('http') ? '_blank' : undefined"
          :rel="item.to.startsWith('http') ? 'noopener' : undefined"
          class="mobile-link"
          @click="closeMobileMenu"
        >
          {{ item.title }}
        </component>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
interface NavItem {
  title: string
  to: string
}

const mobileMenuOpen = ref(false)

const items: NavItem[] = [
  {
    title: 'Home',
    to: '/',
  },
  {
    title: 'Blog',
    to: 'https://zenn.dev/book000',
  },
  {
    title: 'About me',
    to: '/me',
  },
  {
    title: 'Devices',
    to: '/devices',
  },
  {
    title: 'About site',
    to: '/about',
  },
]

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
}
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-4) 0;

  .dark-theme & {
    background: rgba(15, 23, 42, 0.8);
  }
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  text-decoration: none;
  color: var(--color-text-primary);
  font-weight: 600;
  font-size: var(--text-lg);
  transition: all var(--transition-fast);

  &:hover {
    color: var(--color-primary);
  }
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(
    135deg,
    var(--color-primary),
    var(--color-secondary)
  );
  color: white;
  border-radius: var(--radius-lg);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: var(--space-8);

  @media (max-width: 850px) {
    display: none;
  }
}

.nav-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: var(--text-sm);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);

  &:hover {
    color: var(--color-text-primary);
    background: var(--color-surface);
  }

  &.router-link-active {
    color: var(--color-primary);
    background: rgba(14, 165, 233, 0.1);
  }
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-left: var(--space-4);
  padding-left: var(--space-4);
  border-left: 1px solid var(--color-border);
}

.mobile-menu-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);

  &:hover {
    background: var(--color-surface);
    color: var(--color-text-primary);
  }

  @media (max-width: 850px) {
    display: flex;
  }
}

.mobile-menu {
  display: none;
  padding: var(--space-4) 0;
  border-top: 1px solid var(--color-border);

  @media (max-width: 850px) {
    display: block;
  }
}

.mobile-link {
  display: block;
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: 500;
  padding: var(--space-3) 0;
  border-bottom: 1px solid var(--color-border);
  transition: color var(--transition-fast);

  &:hover {
    color: var(--color-text-primary);
  }

  &.router-link-active {
    color: var(--color-primary);
  }

  &:last-child {
    border-bottom: none;
  }
}
</style>
