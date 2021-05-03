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

    <h2 class="text-center mb-1">Search</h2>
    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="searchWord"
        clearable
        :rules="[(value) => !!value || '必須項目です']"
        append-outer-icon="mdi-magnify"
        @click:append-outer="search"
      />
    </v-form>
<!--
    <h2 class="text-center mt-5 mb-1">Recent Posts</h2>
    <v-list>
      <v-list-item
        v-for="(item, i) in articles.slice(0, 5)"
        :key="i"
        :to="'/blog/' + item.id"
      >
        <v-list-item-content :title="item.title">
          <v-list-item-title v-text="item.title" />
          <v-list-item-subtitle
            v-text="
              item.createdOverrideAt
                ? formatDate(item.createdOverrideAt)
                : formatDate(item.publishedAt)
            "
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>
-->
    <h2 class="text-center mt-5 mb-1">Category</h2>
    <v-list>
      <v-list-item
        v-for="(item, i) in categorys"
        :key="i"
        :to="'/search?category=' + item.id"
      >
        <v-list-item-content v-text="item.name" />
      </v-list-item>
    </v-list>

    <h2 class="text-center mt-5 mb-1">Tags</h2>
    <v-list>
      <v-list-item
        v-for="(item, i) in tags"
        :key="i"
        :to="'/search?tag=' + item.id"
      >
        <v-list-item-content v-text="item.name" />
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import axios from 'axios'

export interface SidebarArticle {
  id: string
  createdAt: Date
  createdOverrideAt: Date | null
  updatedAt: Date
  publishedAt: Date
  revisedAt: Date
  title: string
  contents: string
}

export interface Category {
  id: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  revisedAt: Date
  name: string
}

export interface Tag {
  id: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  revisedAt: Date
  name: string
}

interface Toc {
  id: string
  text: string
  name: string
}

export default Vue.extend({
  props: {
    toc: {
      type: Array as PropType<Toc[]>,
      default: () => [],
    },
    articles: {
      type: Array as PropType<SidebarArticle[]>,
      default: () => [],
    },
    categorys: {
      type: Array as PropType<Category[]>,
      default: () => [],
    },
    tags: {
      type: Array as PropType<Tag[]>,
      default: () => [],
    },
  },
  data(): {
    searchWord: string
  } {
    return {
      searchWord: '',
    }
  },
  methods: {
    formatDate(_date: Date) {
      return (
        _date.getFullYear() +
        '/' +
        ('0' + (_date.getMonth() + 1)).slice(-2) +
        '/' +
        ('0' + _date.getDate()).slice(-2)
      )
    },
    search() {
      if (!(this.$refs.form as Vue & { validate: () => boolean }).validate()) {
        return
      }
      this.$router.push({ path: '/search', query: { q: this.searchWord } })
    },
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
