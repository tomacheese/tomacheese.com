<template>
  <div>
    <section class="hero">
      <v-container fluid fill-height class="hero__content">
        <v-row justify="center">
          <v-col class="hero__content-text white--text" cols="12">
            <h1>Tomachi Site</h1>
            <p>The world is made up of IDEA.</p>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section class="user-about">
      <TopAbout :details="details" :timelines="timelines" />
    </section>
    <section class="nav-blog">
      <TopBlogNav :articles="articles" />
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { Detail, TimelineItem } from '~/components/TopAbout.vue'

import { Article } from '~/components/TopBlogNav.vue'

export default Vue.extend({
  name: 'TopPage',
  async asyncData({ $config }) {
    const ret = { details: [], timelines: [], articles: [] }

    {
      const { data } = await axios.get(
        `${$config.MICROCMS_API_URL}/top-details`,
        {
          headers: { 'X-API-KEY': $config.MICROCMS_API_KEY },
        },
      )
      ret.details = data.contents
    }

    {
      const { data } = await axios.get(
        `${$config.MICROCMS_API_URL}/top-timelines`,
        {
          headers: { 'X-API-KEY': $config.MICROCMS_API_KEY },
        },
      )
      ret.timelines = data.contents
    }

    {
      const { data } = await axios.get(`${$config.MICROCMS_API_URL}/blog`, {
        headers: { 'X-API-KEY': $config.MICROCMS_API_KEY },
      })
      ret.articles = data.contents
    }

    return ret
  },
  data(): {
    details: Detail[]
    timelines: TimelineItem[]
    articles: Article[]
  } {
    return {
      details: [],
      timelines: [],
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
