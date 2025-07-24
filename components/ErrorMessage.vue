<!-- 共通エラーメッセージコンポーネント -->
<template>
  <div class="error-card" role="alert">
    <p>
      {{ icon }} {{ message }}
    </p>
    <button v-if="retry" class="retry-button" @click="$emit('retry')">
      再試行
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message?: string
  icon?: string
  retry?: boolean
}

withDefaults(defineProps<Props>(), {
  message: 'データの読み込みに失敗しました。しばらくしてからもう一度お試しください。',
  icon: '⚠️',
  retry: false
})

defineEmits<{
  retry: []
}>()
</script>