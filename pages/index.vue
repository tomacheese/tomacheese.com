<template>
  <div>
    <section class="hero">
      <div class="hero__content">
        <h1>Tomachi Site</h1>
        <p>The world is made up of IDEA.</p>
      </div>
    </section>
    <section class="user-about">
      <TopAbout :details="details" :timelines="timelines" />
    </section>
  </div>
</template>

<script setup lang="ts">
// データの読み込み
let details = []
let timelines = []

try {
  const detailsData = await $fetch('/top-details.json')
  const timelinesData = await $fetch('/top-timelines.json')
  
  details = detailsData?.body || []
  timelines = timelinesData?.body || []
} catch (error) {
  console.warn('Failed to load top page data:', error)
  // Fallback data or empty arrays
  details = []
  timelines = []
}

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
  color: white;

  h1 {
    font-size: 64px;
    font-family: 'Montserrat', sans-serif;
    margin-bottom: 16px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  }

  p {
    font-size: 18px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  }
}
</style>
