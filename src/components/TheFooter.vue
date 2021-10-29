<template>
  <v-footer padless>
    <v-card class="flex" flat tile>
      <v-card-title>
        <v-spacer />

        <v-tooltip v-for="icon in icons" :key="icon.icon" bottom>
          <template #activator="{ on, attrs }">
            <v-btn :href="icon.href" v-bind="attrs" icon class="mx-2" v-on="on">
              <v-icon> mdi-{{ icon.icon }} </v-icon>
            </v-btn>
          </template>
          <span>{{ icon.title }}</span>
        </v-tooltip>

        <v-spacer />
      </v-card-title>

      <v-card-text class="py-2 text-center">
        {{ new Date().getFullYear() }} — Tomachi
      </v-card-text>
    </v-card>
    <div class="dark-switch">
      <VDarkSwitch />
    </div>
  </v-footer>
</template>

<script lang="ts">
import Vue from 'vue'

interface Icon {
  icon: string
  title: string
  href: string
}

export default Vue.extend({
  data(): {
    icons: Icon[]
  } {
    return {
      icons: [
        {
          icon: 'twitter',
          title: '@book000',
          href: 'https://twitter.com/book000',
        },
        {
          icon: 'github',
          title: 'book000',
          href: 'https://github.com/book000',
        },
        {
          icon: 'discord',
          title: 'tomachi#0310',
          href: 'https://discordapp.com/users/221991565567066112',
        },
      ],
    }
  },
})
</script>

<style lang="scss" scoped>
.dark-switch {
  margin-bottom: 40px;
  margin-right: 10px;
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
