<template>
  <div>
    <NonTopHeader title="ブログ" />
    <v-container>
      <v-row align="start">
        <v-col
          v-for="article in articles"
          :key="article.id"
          cols="12"
          :sm="getCol(article.id, articles)"
        >
          <v-card :to="'/blog/' + article.id">
            <v-img
              :src="
                'image' in article ? article.image.url : '/images/default.jpg'
              "
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.9)"
              height="200px"
            >
              <v-card-title
                v-text="
                  article.title +
                  ' - ' +
                  (article.createdOverrideAt
                    ? formatDate(article.createdOverrideAt)
                    : formatDate(article.publishedAt))
                "
              />
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
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
}

export default Vue.extend({
  components: { NonTopHeader },
  async asyncData({ $config }) {
    const { data } = await axios.get(`${$config.MICROCMS_API_URL}/blog`, {
      headers: { 'X-API-KEY': $config.MICROCMS_API_KEY },
    })
    const result = {
      articles: [],
    }
    result.articles = data.contents.map((article: Article) => {
      article.createdAt = new Date(article.createdAt)
      article.createdOverrideAt =
        'createdOverrideAt' in article && article.createdOverrideAt
          ? new Date(article.createdOverrideAt)
          : null
      article.updatedAt = new Date(article.updatedAt)
      article.publishedAt = new Date(article.publishedAt)
      article.revisedAt = new Date(article.revisedAt)
      return article
    })
    return result
  },
  data(): {
    articles: Article[]
  } {
    return {
      articles: [],
    }
  },
  head() {
    return {
      title: 'ブログ記事一覧',
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
  },
})
</script>
