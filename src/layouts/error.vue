<template>
  <v-container fluid fill-height>
    <v-row justify="center">
      <v-col align="center">
        <h1 v-text="title" />
        <v-icon size="260px">mdi-bomb</v-icon>
        <p v-html="description" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LayoutError',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data(): {
    title: string
    description: string
  } {
    return {
      title: '',
      description: '',
    }
  },
  mounted() {
    if (this.error.statusCode === 404) {
      this.title = this.error.statusCode + ' - 指定されたページが見つかりません'
      this.description = '指定されたページが見つかりませんでした。'
    } else {
      this.title = this.error.statusCode + ' - 何らかのエラーが発生'
      this.description =
        '大変申し訳ございません。バグだらけのせいでエラーが発生してしまいました。<br><br>エラーメッセージ: ' +
        this.error.message
    }
  },
})
</script>
