<template>
  <button 
    :title="isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'"
    class="theme-toggle"
    @click="toggleTheme"
  >
    <div class="toggle-track">
      <div class="toggle-thumb">
        <Icon :name="isDark ? 'mdi:moon-waning-crescent' : 'mdi:white-balance-sunny'" size="16" />
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

function toggleTheme() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

// Apply theme class to document
watchEffect(() => {
  if (import.meta.client) {
    const html = document.documentElement
    if (isDark.value) {
      html.classList.add('dark-theme')
    } else {
      html.classList.remove('dark-theme')
    }
  }
})
</script>

<style scoped>
.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-1);
  border-radius: var(--radius-lg);
  transition: all var(--transition-fast);
  
  &:hover {
    background: var(--color-surface);
  }
}

.toggle-track {
  position: relative;
  width: 52px;
  height: 28px;
  background: var(--color-gray-200);
  border-radius: 14px;
  transition: all var(--transition-normal);
  
  .dark-theme & {
    background: var(--color-gray-600);
  }
}

.toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 24px;
  height: 24px;
  background: var(--color-white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray-600);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  transform: translateX(0);
  
  .dark-theme & {
    background: var(--color-gray-800);
    color: var(--color-yellow-400);
    transform: translateX(24px);
  }
}
</style>