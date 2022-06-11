<template>
  <v-footer color="grey darken-2" padless>
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link.title"
        color="white"
        text
        rounded
        class="my-2"
        :to='link.link'
      >
        {{ link.title }}
      </v-btn>

      <v-col class="grey darken-3 py-1 text-center white--text" cols="12">
        <p class="mb-0 mt-2">{{ new Date().getFullYear() }} — <strong>Ranni</strong></p>
        <p class="text-caption pt-3 mb-0 grey--text">
          Copyright © 2022 Ranni Inc. 保留所有权利。
        </p>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [{title:"主页",link:'/'}],
  }),
};
</script>

<style>
</style>