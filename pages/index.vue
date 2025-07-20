<template>
  <div>
    <section class="hero">
      <div class="hero__content">
        <h1>Tomachi Site</h1>
        <p>The world is made up of IDEA.</p>
      </div>
    </section>
    <section class="user-about">
      <div v-if="loadError" class="error-message">
        <p>
          ⚠️
          データの読み込みに失敗しました。しばらくしてからもう一度お試しください。
        </p>
      </div>
      <TopAbout v-else :details="details" :timelines="timelines" />
    </section>
  </div>
</template>

<script setup lang="ts">
// データの読み込み
const details = ref([])
const timelines = ref([])
const loadError = ref(false)

// データ読み込み関数
const loadData = async () => {
  const [detailsResult, timelinesResult] = await Promise.allSettled([
    $fetch('/top-details.json'),
    $fetch('/top-timelines.json'),
  ])

  // 個別の結果を処理
  if (detailsResult.status === 'fulfilled') {
    details.value = detailsResult.value?.body || []
  } else {
    console.warn('Failed to load details data:', detailsResult.reason)
    details.value = []
  }

  if (timelinesResult.status === 'fulfilled') {
    timelines.value = timelinesResult.value?.body || []
  } else {
    console.warn('Failed to load timelines data:', timelinesResult.reason)
    timelines.value = []
  }

  // 両方とも失敗した場合のみエラー状態に設定
  loadError.value =
    detailsResult.status === 'rejected' && timelinesResult.status === 'rejected'
}

// クライアントサイドでデータ読み込み
onMounted(() => {
  loadData()
})

// SEO
useSeoMeta({
  title: 'トップページ',
})
</script>

<style lang="scss" scoped>
.hero__content {
  background:
    linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url('/images/top.jpg');
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  text-align: center;
  width: 100%;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 64px;
    font-family: 'Montserrat', sans-serif;
    margin-bottom: 16px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    color: white !important;
  }

  p {
    font-size: 18px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
    color: white !important;
  }
}

.error-message {
  text-align: center;
  padding: 20px;
  margin: 20px;
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 8px;
  color: #c33;

  p {
    margin: 0;
    font-size: 16px;
  }
}
</style>
