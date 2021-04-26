<template>
  <div>
    <section class="hero">
      <v-container fluid fill-height class="hero__content">
        <v-row justify="center">
          <v-col class="hero__content-text white--text" cols="12">
            <h1>Tomachi Site</h1>
            <p>The world is made up of IDEA.</p>
          </v-col>

          <v-col v-for="card in cards" :key="card.title" cols="12" sm="3">
            <v-btn
              :to="card.link"
              :color="card.color"
              class="white--text"
              large
              v-text="card.title"
            />
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section class="user-about">
      <TopAbout />
    </section>
    <section class="nav-blog">
      <TopBlogNav />
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface Card {
  title: string
  link: string
  color: string
}

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
  data(): {
    cards: Card[]
    articles: Article[]
  } {
    return {
      cards: [
        {
          title: 'About Me',
          link: '/me',
          color: 'pink',
        },
        {
          title: 'About This Web Site',
          link: '/about',
          color: 'purple',
        },
      ],
      articles: [],
    }
  },
  head() {
    return {
      title: 'トップページ',
    }
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
</style>
