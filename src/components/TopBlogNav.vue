<template>
  <v-container>
    <h2>ブログ</h2>
    <p>気が向いたときに書いてます。</p>
    <v-row>
      <v-col
        v-for="article in articles.slice(0, 3)"
        :key="article.title"
        cols="12"
        sm="4"
      >
        <v-card>
          <v-img
            :src="
              'image' in article ? article.image.url : '/images/default.jpg'
            "
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.9)"
            height="200px"
          >
            <v-card-title v-text="article.title" />
          </v-img>

          <v-card-actions>
            <v-spacer />

            <v-btn :to="'/blog/' + article.id" text color="teal accent-4">
              READ MORE
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export interface Article {
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
  props: {
    articles: {
      type: Array as PropType<Article[]>,
      default: () => [],
    },
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
