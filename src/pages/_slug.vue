<template>
  <div>
    <NonTopHeader
      :title="article.title"
      :published-at="article.publishedAt"
      :updated-at="article.updatedAt"
    />
    <v-container fluid fill-height>
      <v-row align="start">
        <v-col md="9" cols="12">
          <v-container
            class="content-container my-9 rounded-xl background"
            v-html="article.contents"
          />
        </v-col>
        <v-col md="3" cols="12" class="mt-10">
          <Sidebar :toc="article.toc" :categorys="categorys" :tags="tags" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { MetaInfo } from 'vue-meta'
import cheerio from 'cheerio'
import hljs from 'highlight.js'
import 'highlight.js/styles/androidstudio.css'
import NonTopHeader from '~/components/NonTopHeader.vue'

interface Category {
  id: string | null
  createdAt: Date | null
  updatedAt: Date | null
  publishedAt: Date | null
  revisedAt: Date | null
  name: string | null
}

interface Tag {
  id: string | null
  createdAt: Date | null
  updatedAt: Date | null
  publishedAt: Date | null
  revisedAt: Date | null
  name: string | null
}

interface Toc {
  id: string
  text: string
  name: string
}

interface Article {
  id: string | null
  createdAt: Date | null
  updatedAt: Date | null
  publishedAt: Date | null
  revisedAt: Date | null
  title: string | null
  contents: string | null
  toc: Toc[]
}

export default Vue.extend({
  components: { NonTopHeader },
  async asyncData({ params, query, $config, error }) {
    let slug = params.slug
    if (params.slug === 'me') slug = 'about-me'
    if (params.slug === 'pc') slug = 'devices'

    const apiurl =
      query.draftKey === undefined
        ? `${$config.MICROCMS_API_URL}/main/${slug}`
        : `${$config.MICROCMS_API_URL}/main/${slug}?draftKey=${query.draftKey}`
    try {
      const ret = {
        article: {
          id: null,
          createdAt: null,
          updatedAt: null,
          publishedAt: null,
          revisedAt: null,
          title: null,
          contents: null,
          category: null,
          tags: [],
          image: null,
          toc: [],
        },
        categorys: [],
        tags: [],
      }

      {
        const { data } = await axios.get(apiurl, {
          headers: { 'X-API-KEY': $config.MICROCMS_API_KEY },
        })

        const $ = cheerio.load(data.contents)
        $('pre code').each((_, elm) => {
          const result = hljs.highlightAuto($(elm).text())
          $(elm).html(result.value)
          $(elm).addClass('hljs')
        })
        $('p').each((_, elm) => {
          if (elm.children.length >= 1) {
            // @ts-ignore
            if (elm.children[0].name === 'br') {
              $(elm.children[0]).remove()
            }
          }
        })
        $('a').each((_, elm) => {
          const href = $(elm).attr('href')
          if (href && href[0] === '/') {
            $(elm).removeAttr('target')
            $(elm).removeAttr('rel')
            $(elm).addClass('nuxt-link-active')
          }
        })
        const headings = $('h2, h3').toArray()
        data.toc = headings.map((data) => ({
          // @ts-ignore
          text: $(data).text(),
          id: data.attribs.id,
          name: data.name,
        }))
        data.contents = $.html()
        data.createdAt = new Date(data.createdAt)
        data.updatedAt = new Date(data.updatedAt)
        data.publishedAt = new Date(data.publishedAt)
        data.revisedAt = new Date(data.revisedAt)

        ret.article = data
      }

      /*
      {
        let { data } = await axios.get(`${$config.MICROCMS_API_URL}/blog`, {
          headers: { 'X-API-KEY': $config.MICROCMS_API_KEY },
        })
        data = data.contents.map((article: SidebarArticle) => {
          article.createdAt = new Date(article.createdAt)
          article.createdOverrideAt = article.createdOverrideAt
            ? new Date(article.createdOverrideAt)
            : null
          article.updatedAt = new Date(article.updatedAt)
          article.publishedAt = new Date(article.publishedAt)
          article.revisedAt = new Date(article.revisedAt)
          return article
        })
        ret.categorys = data.contents
      }
*/

      {
        const { data } = await axios.get(
          `${$config.MICROCMS_API_URL}/category`,
          {
            headers: { 'X-API-KEY': $config.MICROCMS_API_KEY },
          }
        )
        ret.categorys = data.contents
      }

      {
        const { data } = await axios.get(`${$config.MICROCMS_API_URL}/tags`, {
          headers: { 'X-API-KEY': $config.MICROCMS_API_KEY },
        })
        ret.tags = data.contents
      }
      return ret
    } catch (err) {
      if (err.response === undefined) {
        throw err
      }
      const data = { title: '', contents: '' }
      error({
        statusCode: 404,
      })
      return data
    }
  },
  data(): {
    article: Article
    categorys: Category[]
    tags: Tag[]
  } {
    return {
      article: {
        id: null,
        createdAt: null,
        updatedAt: null,
        publishedAt: null,
        revisedAt: null,
        title: null,
        contents: null,
        toc: [],
      },
      categorys: [],
      tags: [],
    }
  },
  head(): MetaInfo {
    return {
      title: `${this.article.title}`,
    }
  },
})
</script>

<style lang="scss">
.content-container {
  padding: 20px;

  h2 {
    position: relative;
    padding: 0 1rem;
    border-bottom: 2px solid #fdcb6e;
    margin: 20px 0;
  }

  h2::before {
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 20%;
    height: 2px;
    content: '';
    background-color: var(--v-archiveTitleColor-base);
  }

  h3 {
    padding: 0.3rem 1rem;
    border-left: 1px solid var(--v-maincolor-base);
    background-color: var(--v-archiveSubTitleColor-base);
    margin: 25px 0;
  }

  h4 {
    border-bottom: 1px solid var(--v-maincolor-base);
    padding: 0.3rem 1rem;
    background-color: var(--v-archiveSubTitleColor-base);
    margin: 25px 0;
  }

  pre code {
    margin: 20px 0;
    padding: 10px;
  }

  img {
    max-width: 100%;
  }
}
</style>
