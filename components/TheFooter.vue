<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-main">
          <div class="footer-brand">
            <div class="logo">
              <span class="logo-text">Tomachi</span>
            </div>
            <p class="brand-description">
              Developer of Discord bot applications, efficiency projects, etc.
            </p>
          </div>

          <div class="footer-links">
            <div class="link-group">
              <h3 class="link-title">Navigation</h3>
              <ul class="link-list">
                <li><NuxtLink to="/me">About Me</NuxtLink></li>
                <li><NuxtLink to="/devices">Devices</NuxtLink></li>
                <li><NuxtLink to="/about">About Site</NuxtLink></li>
              </ul>
            </div>

            <div class="link-group">
              <h3 class="link-title">External</h3>
              <ul class="link-list">
                <li>
                  <a
                    href="https://github.com/book000"
                    target="_blank"
                    rel="noopener"
                    >GitHub</a
                  >
                </li>
                <li>
                  <a
                    href="https://zenn.dev/book000"
                    target="_blank"
                    rel="noopener"
                    >Zenn</a
                  >
                </li>
                <li>
                  <a
                    href="https://twitter.com/book000"
                    target="_blank"
                    rel="noopener"
                    >Twitter</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="footer-copyright">
            <p>
              &copy; {{ new Date().getFullYear() }} Tomachi. All rights
              reserved.
            </p>
          </div>

          <div class="footer-social">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              :title="social.name"
              target="_blank"
              rel="noopener"
              class="social-link"
            >
              <Icon :name="social.icon" size="20" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
interface SocialLink {
  name: string
  icon: string
  url: string
}

const socialLinks: SocialLink[] = [
  {
    name: 'Twitter',
    icon: 'mdi:twitter',
    url: 'https://twitter.com/book000',
  },
  {
    name: 'GitHub',
    icon: 'mdi:github',
    url: 'https://github.com/book000',
  },
  {
    name: 'Discord',
    icon: 'mdi:discord',
    url: 'https://discord.com/users/221991565567066112',
  },
]
</script>

<style scoped>
.footer {
  background: var(--color-gray-900);
  color: var(--color-gray-300);
  padding: var(--space-20) 0 var(--space-8);

  .dark-theme & {
    background: var(--color-gray-950, #020617);
  }
}

.footer-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
}

.footer-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--space-12);
  }
}

.footer-brand {
  max-width: 400px;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
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

.logo-text {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-white);
}

.brand-description {
  color: var(--color-gray-400);
  line-height: 1.6;
  font-size: var(--text-sm);
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--space-8);
}

.link-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.link-title {
  color: var(--color-white);
  font-size: var(--text-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-2);
}

.link-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.link-list a {
  color: var(--color-gray-400);
  text-decoration: none;
  font-size: var(--text-sm);
  transition: color var(--transition-fast);

  &:hover {
    color: var(--color-white);
  }
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-gray-800);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: var(--space-4);
    text-align: center;
  }
}

.footer-copyright p {
  color: var(--color-gray-500);
  font-size: var(--text-xs);
  margin: 0;
}

.footer-social {
  display: flex;
  gap: var(--space-3);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: var(--color-gray-400);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);

  &:hover {
    color: var(--color-white);
    background: var(--color-gray-800);
  }
}
</style>
