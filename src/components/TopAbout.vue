<template>
  <v-container>
    <h2 class="user-title text-center my-5">
      <v-avatar>
        <img alt="avatar" class="ma-10" src="/images/avatar.jpg" />
      </v-avatar>
      <span class="display-1 name">Tomachi</span>
    </h2>

    <v-row justify="center" align="center">
      <v-col md="5">
        <v-list disabled>
          <v-list-item-group>
            <v-list-item v-for="(item, i) in details" :key="i">
              <v-list-item-icon>
                <v-icon v-text="item.icon" />
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text" />
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>

      <v-col md="6">
        <v-timeline>
          <v-timeline-item
            v-for="(timeline, i) in timelines"
            :key="i"
            :color="timeline.color"
            :icon="timeline.icon"
            large
          >
            <template #opposite class="text-right">
              <span class="headline" v-text="timeline.date" />
            </template>
            <div class="py-4">
              <h2 class="body-1 font-weight-light" v-html="timeline.text" />
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export interface Detail {
  icon: string
  text: string
}

export interface TimelineItem {
  date: string
  text: string
  icon: string
  color: string
}

export default Vue.extend({
  props: {
    details: {
      type: Array as PropType<Detail[]>,
      default: () => [],
    },
    timelines: {
      type: Array as PropType<TimelineItem[]>,
      default: () => [],
    }
  },
})
</script>

<style lang="scss" scoped>
.name {
  font-family: 'Noto Sans JP', sans-serif !important;
  vertical-align: middle;
}
h2.user-title {
  padding-bottom: 10px;
  border-bottom: 2px solid #fdcb6e;
}
</style>

<style lang="scss">
.v-timeline-item {
  flex-direction: row-reverse !important;
}
.v-timeline-item__opposite {
  text-align: right !important;
}
a {
  color: maincolor !important;
}
</style>
