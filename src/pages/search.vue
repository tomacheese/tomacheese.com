<template>
  <div>
    <NonTopHeader :title="title" />
    <v-container>
      <p class="text-center">
        見つかった項目は以下の {{ articles.length }} 件です。
      </p>
      <v-list v-if="articles.length != 0">
        <v-list-item
          v-for="(article, index) in articles"
          :key="index"
          :to="article.isBlog ? '/blog/' + article.id : '/' + article.id"
        >
          <v-list-item-content>
            <v-list-item-title v-text="article.title" />
            <v-list-item-subtitle
              class="pa-5"
              v-html="article.contents.split('<br')[0]"
            />
          </v-list-item-content>

          <v-list-item-action>
            <v-list-item-action-text
              v-text="
                (article.createdOverrideAt
                  ? formatDateTime(article.createdOverrideAt)
                  : formatDateTime(article.publishedAt)) + ' 公開'
              "
            />
            <v-spacer />
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { MetaInfo } from 'vue-meta'
import NonTopHeader from '~/components/NonTopHeader.vue'

interface Article {
  id: string
  createdAt: Date
  createdOverrideAt: Date | null
  updatedAt: Date
  publishedAt: Date
  revisedAt: Date
  title: string
  contents: string
  isBlog: boolean
}

export default Vue.extend({
  components: { NonTopHeader },
  async asyncData({ $config, query }) {
    const result = {
      articles: [],
      title: '',
    }
    let apiparam: string
    if ('q' in query) {
      apiparam = `q=${query.q}`
      result.title = `検索 - ${query.q}`
    } else if ('category' in query) {
      apiparam = `filters=category[equals]${query.category}`
      result.title = `カテゴリ検索 - ${query.category}`
    } else if ('tag' in query) {
      apiparam = `filters=tags[contains]${query.tag}`
      result.title = `タグ検索 - ${query.tag}`
    } else {
      result.title = `すべて検索`
      apiparam = ''
    }

    // blog
    {
      const { data } = await axios.get(
        `${$config.MICROCMS_API_URL}/blog?${apiparam}`,
        {
          headers: { 'X-API-KEY': $config.MICROCMS_API_KEY },
        }
      )
      result.articles = data.contents.map((article: Article) => {
        article.createdAt = new Date(article.createdAt)
        article.createdOverrideAt =
          'createdOverrideAt' in article && article.createdOverrideAt
            ? new Date(article.createdOverrideAt)
            : null
        article.updatedAt = new Date(article.updatedAt)
        article.publishedAt = new Date(article.publishedAt)
        article.revisedAt = new Date(article.revisedAt)
        article.isBlog = true

        return article
      })
    }

    // main
    {
      const { data } = await axios.get(
        `${$config.MICROCMS_API_URL}/main?${apiparam}`,
        {
          headers: { 'X-API-KEY': $config.MICROCMS_API_KEY },
        }
      )
      result.articles = result.articles.concat(
        data.contents.map((article: Article) => {
          article.createdAt = new Date(article.createdAt)
          article.createdOverrideAt =
            'createdOverrideAt' in article && article.createdOverrideAt
              ? new Date(article.createdOverrideAt)
              : null
          article.updatedAt = new Date(article.updatedAt)
          article.publishedAt = new Date(article.publishedAt)
          article.revisedAt = new Date(article.revisedAt)
          article.isBlog = false

          return article
        })
      )
    }
    return result
  },
  data(): {
    articles: Article[]
    title: string
  } {
    return {
      articles: [],
      title: '検索',
    }
  },
  head(): MetaInfo {
    return {
      title: this.title + ' - 検索結果',
    }
  },
  methods: {
    getCol(_id: string, _articles: Article[]) {
      return _articles.map((article) => article.id).indexOf(_id) === 0 ? 12 : 4
    },
    formatDate(_date: Date) {
      return (
        _date.getFullYear() +
        '/' +
        ('0' + (_date.getMonth() + 1)).slice(-2) +
        '/' +
        ('0' + _date.getDate()).slice(-2)
      )
    },
    formatDateTime(_date: Date) {
      return (
        _date.getFullYear() +
        '/' +
        ('0' + (_date.getMonth() + 1)).slice(-2) +
        '/' +
        ('0' + _date.getDate()).slice(-2) +
        ' ' +
        ('0' + _date.getHours()).slice(-2) +
        ':' +
        ('0' + _date.getMinutes()).slice(-2)
      )
    },
  },
})
</script>
