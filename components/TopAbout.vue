<template>
  <div class="about-section">
    <div class="user-header">
      <img src="/images/avatar.jpg" alt="Tomachi Avatar" class="avatar" />
      <h2 class="name">Tomachi</h2>
    </div>

    <div class="content-grid">
      <div class="details-section">
        <ul class="details-list">
          <li v-for="item in details" :key="item.id" class="detail-item">
            <Icon :name="item.icon" size="24" class="detail-icon" />
            <span class="detail-text">{{ item.text }}</span>
          </li>
        </ul>
      </div>

      <div class="timeline-section">
        <div class="timeline">
          <div
            v-for="(timeline, index) in timelines"
            :key="index"
            class="timeline-item"
          >
            <div class="timeline-marker">
              <Icon :name="timeline.icon" size="20" />
            </div>
            <div class="timeline-content">
              <div class="timeline-date">{{ timeline.date }}</div>
              <div class="timeline-text" v-html="sanitizeHtml(timeline.text)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DOMPurify from 'dompurify'

interface Detail {
  id: string
  icon: string
  text: string
}

interface Timeline {
  icon: string
  date: string
  text: string
  color?: string
}

interface Props {
  details: Detail[]
  timelines: Timeline[]
}

defineProps<Props>()

/**
 * HTMLをサニタイズして安全にする関数
 * XSS攻撃を防ぐために、許可されたタグと属性のみを維持する
 */
const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['a', 'strong', 'em', 'b', 'i'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    ADD_ATTR: ['target', 'rel'], // 外部リンクのセキュリティ属性を追加
  })
}
</script>

<style scoped>
.about-section {
  background-color: white;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 4px 12px rgb(0, 0, 0, 0.1);
}

.dark-theme .about-section {
  background-color: #424242;
}

.user-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--color-primary);
  margin-bottom: 1rem;
}

.name {
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-archive-title);
  margin: 0;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.details-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgb(0, 0, 0, 0.1);
}

.dark-theme .detail-item {
  border-bottom-color: rgb(255, 255, 255, 0.1);
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-icon {
  color: var(--color-primary);
  flex-shrink: 0;
}

.detail-text {
  color: var(--color-maincolor);
  line-height: 1.6;
  white-space: normal;
}

.timeline {
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 15px;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: var(--color-primary);
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
  padding-left: 3rem;
}

.timeline-marker {
  position: absolute;
  left: 0;
  top: 0;
  width: 32px;
  height: 32px;
  background-color: var(--color-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 2px 4px rgb(0, 0, 0, 0.2);
}

.timeline-content {
  background-color: rgb(25, 118, 210, 0.05);
  border-radius: 8px;
  padding: 1rem;
  border-left: 3px solid var(--color-primary);
}

.dark-theme .timeline-content {
  background-color: rgb(25, 118, 210, 0.2);
  border-color: var(--color-primary);
}

.timeline-date {
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.timeline-text {
  color: var(--color-maincolor);
  line-height: 1.6;
}

@media (max-width: 968px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .about-section {
    padding: 2rem;
  }

  .avatar {
    width: 80px;
    height: 80px;
  }

  .name {
    font-size: 1.5rem;
  }
}
</style>
