<template>
  <div class="header">
    <v-toolbar>
      <v-toolbar-title style="cursor: pointer" @click="$router.push('/')">
        Tomachi Site
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-tooltip v-for="(item, i) in items" :key="i" bottom>
          <template #activator="{ on, attrs }">
            <v-btn :to="item.to" v-bind="attrs" v-on="on">
              <v-icon color="maincolor"> mdi-{{ item.icon }} </v-icon>
            </v-btn>
          </template>
          <span>{{ item.title }}</span>
        </v-tooltip>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: 'home',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'post',
          title: 'Blog',
          to: '/blog',
        },
        {
          icon: 'account',
          title: 'About Me',
          to: '/me',
        },
        {
          icon: 'information-outline',
          title: 'About Site',
          to: '/about',
        },
      ],
    }
  },
}
</script>
