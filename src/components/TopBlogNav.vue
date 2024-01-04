<template>
  <v-container>
    <h2>ブログ</h2>
    <p>
      気が向いたときに書いてます。記事は
      <a href="https://zenn.dev/book000">Zenn</a> にあります。
    </p>

    <v-row>
      <v-col
        v-for="article in articles.slice(0, 3)"
        :key="article.title"
        cols="12"
        sm="4"
      >
        <v-card :href="article.link">
          <v-img
            :src="article.image"
            class="white--text align-end"
            height="200px"
            contain
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

export interface Article {
  title: string
  link: string
  description: string
  pubDate: Date
  image: string
}

export default Vue.extend({
  data(): { articles: Article[] } {
    return { articles: [] }
  },
  mounted() {
    axios
      .get(
        'http://api.rss2json.com/v1/api.json?rss_url=https://zenn.dev/book000/feed',
      )
      .then((response) => {
        this.articles = []
        for (const item of response.data.items) {
          this.articles.push({
            title: item.title,
            link: item.link,
            description: item.description,
            pubDate: new Date(Date.parse(item.pubDate)),
            image: item.enclosure.link,
          })
        }
      })
      // eslint-disable-next-line no-console
      .catch((reason) => console.error(reason))
  },
})
</script>

<style lang="scss" scoped>
.hero__content {
  background: url('/images/top.jpg');
  background-size: cover;
  background-position: center center;
  text-align: center;
  width: 100%;
  height: 70vh;

  h1 {
    font-size: 64px;
    font-family: 'Montserrat', sans-serif;
  }

  p {
    font-size: 18px;
  }
}

.nav-blog {
  margin: 10px;

  h2 {
    padding-bottom: 10px;
    text-align: center;
    border-bottom: 2px solid #fdcb6e;
    margin: 10px 0;
  }

  p {
    text-align: center;
  }
}
</style>
