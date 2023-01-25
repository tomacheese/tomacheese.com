<template>
  <section class="hero">
    <v-container fluid fill-height class="hero__content">
      <v-row justify="center">
        <v-col class="hero__content-text white--text" cols="12">
          <h1 v-text="title" />
          <div class="article-meta">
            <div v-if="publishedAt != undefined">
              <v-icon color="white">mdi-calendar</v-icon>
              {{ formatDate(publishedAt) }}
            </div>
            <div
              v-if="
                updatedAt != undefined &&
                publishedAt != undefined &&
                updatedAt.getTime() != publishedAt.getTime()
              "
            >
              <v-icon color="white">mdi-update</v-icon>
              {{ formatDate(updatedAt) }}
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true,
    },
    publishedAt: {
      type: Object as () => Date,
      default: undefined,
    },
    updatedAt: {
      type: Object as () => Date,
      default: undefined,
    },
  },
  methods: {
    formatDate(_date: Date) {
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

<style lang="scss" scoped>
.hero__content {
  background: url('/images/top.jpg');
  background-size: cover;
  background-position: center top;
  text-align: center;
  position: relative;
  width: 100%;

  &::before {
    background-color: rgba(0, 0, 0, 0.4);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    content: '';
  }

  h1 {
    z-index: 1;
    margin: 0 auto;
    max-width: 80%;
    font-family: 'Montserrat', sans-serif;
  }

  div {
    z-index: 1;
    font-size: 16px;
  }

  @media screen and (min-width: 600px) {
    height: 30vh;

    h1 {
      font-size: 42px;
    }
  }
}

@media screen and (min-width: 600px) {
  .article-meta {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  div {
    padding: 10px;
  }
}
</style>
