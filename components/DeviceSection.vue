<template>
  <section class="device-section">
    <h2>{{ device.title }}</h2>

    <p v-if="device.description">{{ device.description }}</p>

    <!-- メインPCの詳細表示 -->
    <template v-if="deviceType === 'mainPc'">
      <!-- 簡潔にセクション -->
      <div v-if="device.sections?.summary">
        <h3>{{ device.sections.summary.title }}</h3>
        <ul>
          <li v-for="item in device.sections.summary.items" :key="item">
            {{ item }}
          </li>
        </ul>
      </div>

      <!-- 内容品セクション -->
      <div v-if="device.sections?.components">
        <h3>{{ device.sections.components.title }}</h3>
        <p v-if="device.sections.components.description">
          {{ device.sections.components.description }}
        </p>

        <div
          v-if="device.sections.components.categories"
          class="components-categories"
        >
          <div
            v-for="(category, categoryKey) in device.sections.components
              .categories"
            :key="categoryKey"
            class="component-category"
          >
            <h4>{{ category.title }}</h4>
            <ul class="component-list">
              <li
                v-for="(item, itemIndex) in category.items"
                :key="itemIndex"
                :class="{ unused: item.unused }"
                class="component-item"
              >
                <div class="component-header">
                  <span class="component-name" :class="{ unused: item.unused }">
                    {{ item.name }}
                  </span>
                </div>
                <div class="component-details">
                  <span class="component-status"
                    >ステータス: {{ item.status }}</span
                  >
                  <span class="component-price"
                    >購入価格: {{ formatPrice(item.price) }}</span
                  >
                  <span
                    v-for="(value, key) in item.extra"
                    :key="key"
                    class="component-extra"
                  >
                    {{ key }}:
                    {{ typeof value === 'number' ? formatPrice(value) : value }}
                  </span>
                  <span class="component-date"
                    >購入日: {{ item.purchaseDate }}</span
                  >
                  <span v-if="item.notes" class="component-notes">{{
                    item.notes
                  }}</span>
                </div>
                <div
                  v-if="item.links && item.links.length > 0"
                  class="component-links"
                >
                  <a
                    v-for="(link, linkIndex) in item.links"
                    :key="linkIndex"
                    :href="link.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="component-link"
                  >
                    {{ link.name }}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>

    <!-- ノートPC、サブPC、サーバ等のシンプルなスペック表示 -->
    <template
      v-else-if="
        [
          'notebookPc',
          'subPcBanana',
          'subPcChoco',
          'homeServer',
          'vpsComet',
          'vpsOther',
          'raspberryPiTomaPi',
          'raspberryPiOrange',
        ].includes(deviceType)
      "
    >
      <ul v-if="device.specs">
        <li v-for="spec in device.specs" :key="spec">
          {{ spec }}
        </li>
      </ul>

      <p v-if="device.warranty"><strong>保証:</strong> {{ device.warranty }}</p>
      <p v-if="device.totalPrice">
        <strong>総額:</strong> {{ device.totalPrice }}
      </p>
      <p v-if="device.purchaseInfo">
        <strong>購入情報:</strong> {{ device.purchaseInfo }}
      </p>
      <p v-for="(value, key) in device.extra" :key="key">
        <strong>{{ key }}:</strong>
        {{ typeof value === 'number' ? formatPrice(value) : value }}
      </p>
      <p v-if="device.notes">{{ device.notes }}</p>
      <p v-if="device.related">{{ device.related }}</p>

      <div v-if="device.links && device.links.length > 0" class="device-links">
        <a
          v-for="(link, linkIndex) in device.links"
          :key="linkIndex"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="device-link"
        >
          {{ link.name }}
        </a>
      </div>
    </template>

    <!-- モバイルデバイス -->
    <template v-else-if="deviceType === 'mobileDevices'">
      <ul v-if="device.devices">
        <li v-for="mobile in device.devices" :key="mobile.name">
          {{ mobile.name }}
          <span v-if="mobile.notes"> {{ mobile.notes }}</span>
          <span v-if="mobile.purchaseDate"> {{ mobile.purchaseDate }}購入</span>
        </li>
      </ul>
    </template>

    <!-- スマートウォッチ -->
    <template v-else-if="deviceType === 'smartWatches'">
      <ul v-if="device.devices">
        <li
          v-for="watch in device.devices"
          :key="watch.name"
          class="smartwatch-item"
        >
          <div class="device-header">
            <span class="device-name">{{ watch.name }}</span>
          </div>
          <div class="device-details">
            <span class="device-price">{{ formatPrice(watch.price) }}</span>
            <span class="device-date">{{ watch.purchaseDate }}購入</span>
          </div>
          <div
            v-if="watch.links && watch.links.length > 0"
            class="device-links"
          >
            <a
              v-for="(link, linkIndex) in watch.links"
              :key="linkIndex"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="device-link"
            >
              {{ link.name }}
            </a>
          </div>
        </li>
      </ul>
    </template>

    <!-- その他デバイス -->
    <template v-else-if="deviceType === 'otherDevices'">
      <ul v-if="device.devices">
        <li v-for="(other, index) in device.devices" :key="index">
          {{ other }}
        </li>
      </ul>
    </template>
  </section>
</template>

<script setup lang="ts">
import { formatPrice } from '~/utils/formatters'
import type { Device } from '~/types/devices'

interface Props {
  device: Device
  deviceType: string
}

defineProps<Props>()
</script>

<style scoped>
.device-section {
  margin-bottom: var(--space-12);
}

.device-section h2 {
  font-size: var(--text-3xl);
  border-bottom: 2px solid var(--color-border);
  padding-bottom: var(--space-2);
  margin-bottom: var(--space-6);
}

.device-section h3 {
  font-size: var(--text-2xl);
  color: var(--color-text-secondary);
  margin-top: var(--space-8);
  margin-bottom: var(--space-4);
}

.device-section h4 {
  font-size: var(--text-xl);
  color: var(--color-text-primary);
  margin-top: var(--space-6);
  margin-bottom: var(--space-3);
}

.device-section p {
  margin-bottom: var(--space-4);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.device-section ul {
  margin-bottom: var(--space-4);
  padding-left: var(--space-6);
}

.device-section li {
  margin-bottom: var(--space-2);
  color: var(--color-text-secondary);
  line-height: 1.5;
}

/* Component-specific styles */
.components-categories {
  margin-top: var(--space-6);
}

.component-category {
  margin-bottom: var(--space-8);
}

.component-list {
  padding-left: 0;
  list-style: none;
}

.component-item {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  margin-bottom: var(--space-3);

  .dark-theme & {
    background: var(--color-gray-800);
  }
}

.component-header {
  margin-bottom: var(--space-2);
}

.component-name {
  font-weight: 600;
  color: var(--color-text-primary);

  &.unused {
    text-decoration: line-through;
    color: var(--color-text-tertiary);
  }
}

.component-details {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  margin-bottom: var(--space-2);
  font-size: var(--text-sm);
}

.component-status,
.component-price,
.component-extra,
.component-date,
.component-notes {
  color: var(--color-text-secondary);
}

.component-links {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.component-link {
  display: inline-block;
  padding: var(--space-1) var(--space-2);
  background: var(--color-primary);
  color: white;
  text-decoration: none;
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  transition: all 0.2s;
  border: 1px solid transparent;

  &:hover {
    background: var(--color-primary-dark);
  }

  .dark-theme & {
    background: var(--color-primary-light);
    color: var(--color-gray-900);
    border: 1px solid var(--color-primary);

    &:hover {
      background: var(--color-primary);
      color: white;
      border-color: var(--color-primary-light);
    }
  }
}

/* Mobile device specific styles */
.smartwatch-item {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  margin-bottom: var(--space-2);

  .dark-theme & {
    background: var(--color-gray-800);
  }
}

.device-header {
  margin-bottom: var(--space-1);
}

.device-name {
  font-weight: 600;
  color: var(--color-text-primary);
}

.device-details {
  display: flex;
  gap: var(--space-4);
  margin-bottom: var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.device-links {
  display: flex;
  gap: var(--space-2);
}

.device-link {
  display: inline-block;
  padding: var(--space-1) var(--space-2);
  background: var(--color-primary);
  color: white;
  text-decoration: none;
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  transition: all 0.2s;
  border: 1px solid transparent;

  &:hover {
    background: var(--color-primary-dark);
  }

  .dark-theme & {
    background: var(--color-primary-light);
    color: var(--color-gray-900);
    border: 1px solid var(--color-primary);

    &:hover {
      background: var(--color-primary);
      color: white;
      border-color: var(--color-primary-light);
    }
  }
}

.unused {
  opacity: 0.6;
}

@media (max-width: 768px) {
  .component-details {
    font-size: var(--text-xs);
  }

  .device-details {
    flex-direction: column;
    gap: var(--space-1);
  }

  .component-links,
  .device-links {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
