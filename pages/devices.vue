<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="page-title">{{ devicesData?.title || 'デバイス一覧' }}</h1>
        </div>
      </div>
    </section>

    <div class="container">
      <div class="content-layout">
        <main class="main-content">
          <article class="content-container">
            <!-- 概要セクション -->
            <section v-if="devicesData?.overview">
              <h2>{{ devicesData.overview.title }}</h2>
              <ul>
                <li
                  v-for="item in devicesData.overview.history"
                  :key="`${item.date}-${item.description}`"
                >
                  {{ item.description }}: {{ item.date }}
                </li>
              </ul>
            </section>

            <!-- デバイスセクション -->
            <template v-if="devicesData?.devices">
              <!-- メインPC -->
              <DeviceSection
                v-if="devicesData.devices.mainPc"
                :device="devicesData.devices.mainPc"
                device-type="mainPc"
              />

              <!-- ノートPC -->
              <DeviceSection
                v-if="devicesData.devices.notebookPc"
                :device="devicesData.devices.notebookPc"
                device-type="notebookPc"
              />

              <!-- サブPC (Banana) -->
              <DeviceSection
                v-if="devicesData.devices.subPcBanana"
                :device="devicesData.devices.subPcBanana"
                device-type="subPcBanana"
              />

              <!-- サブPC (CHOCO) -->
              <DeviceSection
                v-if="devicesData.devices.subPcChoco"
                :device="devicesData.devices.subPcChoco"
                device-type="subPcChoco"
              />

              <!-- 自宅サーバ -->
              <DeviceSection
                v-if="devicesData.devices.homeServer"
                :device="devicesData.devices.homeServer"
                device-type="homeServer"
              />

              <!-- ConoHa VPS Server (Comet) -->
              <DeviceSection
                v-if="devicesData.devices.vpsComet"
                :device="devicesData.devices.vpsComet"
                device-type="vpsComet"
              />

              <!-- ConoHa VPS Server -->
              <DeviceSection
                v-if="devicesData.devices.vpsOther"
                :device="devicesData.devices.vpsOther"
                device-type="vpsOther"
              />

              <!-- Raspberry Pi (TomaPi) -->
              <DeviceSection
                v-if="devicesData.devices.raspberryPiTomaPi"
                :device="devicesData.devices.raspberryPiTomaPi"
                device-type="raspberryPiTomaPi"
              />

              <!-- Raspberry Pi (Orange) -->
              <DeviceSection
                v-if="devicesData.devices.raspberryPiOrange"
                :device="devicesData.devices.raspberryPiOrange"
                device-type="raspberryPiOrange"
              />

              <!-- モバイルデバイス -->
              <DeviceSection
                v-if="devicesData.devices.mobileDevices"
                :device="devicesData.devices.mobileDevices"
                device-type="mobileDevices"
              />

              <!-- スマートウォッチ -->
              <DeviceSection
                v-if="devicesData.devices.smartWatches"
                :device="devicesData.devices.smartWatches"
                device-type="smartWatches"
              />

              <!-- その他デバイス -->
              <DeviceSection
                v-if="devicesData.devices.otherDevices"
                :device="devicesData.devices.otherDevices"
                device-type="otherDevices"
              />
            </template>
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
import { logger } from '~/utils/logger'

// JSONファイルからデバイスデータを読み込み
const { data: devicesData, error } = await useLazyAsyncData(
  'devices',
  async () => {
    try {
      const result = await $fetch('/api/devices')
      return result
    } catch (err) {
      logger.error('Devices: Error fetching devices data', err)
      return null
    }
  },
)

if (error.value || !devicesData.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Devices data not found',
  })
}

// SEO
useSeoMeta({
  title: `${devicesData.value.title} - Tomachi Site`,
  description: 'Tomachiが所有・使用しているデバイス一覧と購入履歴',
  ogTitle: devicesData.value.title,
  ogDescription: 'Tomachiが所有・使用しているデバイス一覧と購入履歴',
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

.placeholder-notice {
  padding: var(--space-4);
  background: var(--color-gray-100);
  border-radius: var(--radius-md);
  margin-top: var(--space-8);
  color: var(--color-text-secondary);
  font-style: italic;

  .dark-theme & {
    background: var(--color-gray-800);
  }
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
  }

  ol {
    list-style-type: decimal;
  }

  li {
    margin-bottom: var(--space-2);
    color: var(--color-text-secondary);
  }
}
</style>
