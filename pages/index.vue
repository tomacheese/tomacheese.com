<template>
  <div>
    <section class="hero">
      <div class="hero__content">
        <h1>Tomachi Site</h1>
        <p>The world is made up of IDEA.</p>
      </div>
    </section>
    <section class="user-about">
      <ErrorMessage v-if="loadError" />
      <TopAbout v-else :details="details" :timelines="timelines" />
    </section>
  </div>
</template>

<script setup lang="ts">
import type { DetailItem, TimelineItem } from '~/types/content'

// データの読み込み
const { fetchWithErrorHandling } = useApi()

const details = ref<DetailItem[]>([])
const timelines = ref<TimelineItem[]>([])
const loadError = ref(false)

// データ読み込み関数
const loadData = async () => {
  const [detailsResult, timelinesResult] = await Promise.allSettled([
    fetchWithErrorHandling<DetailItem[]>('/top-details.json'),
    fetchWithErrorHandling<TimelineItem[]>('/top-timelines.json'),
  ])

  // 結果をチェックするヘルパー関数
  const isDataLoadFailure = (result: PromiseSettledResult<DetailItem[] | TimelineItem[] | null>) => {
    return result.status === 'rejected' || !result.value
  }

  // 個別の結果を処理
  if (detailsResult.status === 'fulfilled' && detailsResult.value) {
    details.value = detailsResult.value
  } else {
    details.value = []
  }

  if (timelinesResult.status === 'fulfilled' && timelinesResult.value) {
    timelines.value = timelinesResult.value
  } else {
    timelines.value = []
  }

  // 両方とも失敗した場合のみエラー状態に設定
  loadError.value = isDataLoadFailure(detailsResult) && isDataLoadFailure(timelinesResult)
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
    url('/images/top.webp'), url('/images/top.jpg');
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
</style>
