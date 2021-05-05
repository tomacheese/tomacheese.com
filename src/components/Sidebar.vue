<template>
  <v-container fluid fill-height style="display: block">
    <div v-if="toc.length != 0" class="toc-container mb-5">
      <h2 class="text-center mb-1">Table Of Contents</h2>
      <ul class="lists">
        <li v-for="item in toc" :key="item.id" :class="`list ${item.name}`">
          <nuxt-link v-scroll-to="`#${item.id}`" to>
            {{ item.text }}
          </nuxt-link>
        </li>
      </ul>
    </div>

    <h2 class="text-center mt-5 mb-1">Links</h2>
    <v-list>
      <v-list-item v-for="(item, i) in links" :key="i" :href="item.url">
        <v-list-item-icon>
          <v-icon v-text="item.icon" />
        </v-list-item-icon>
        <v-list-item-content v-text="item.title" />
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

interface Toc {
  id: string
  text: string
  name: string
}

interface Link {
  icon: string
  title: string
  url: string
}

export default Vue.extend({
  props: {
    toc: {
      type: Array as PropType<Toc[]>,
      default: () => [],
    },
  },
  data(): {
    searchWord: string
    links: Link[]
  } {
    return {
      searchWord: '',
      links: [
        {
          icon: 'mdi-twitter',
          title: 'Twitter',
          url: 'https://twitter.com/book000',
        },
        {
          icon: 'mdi-github',
          title: 'GitHub',
          url: 'https://github.com/book000',
        },
        {
          icon: 'mdi-post',
          title: 'Zenn.dev',
          url: 'https://zenn.dev/book000',
        },
        {
          icon: 'mdi-minecraft',
          title: 'jao Minecraft Server',
          url: 'https://jaoafa.com',
        },
      ],
    }
  },
})
</script>
<style lang="scss" scoped>
.lists {
  .list.h3 {
    margin-left: 1em;
  }
}
</style>
