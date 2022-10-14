<template>
  <v-app>
    <v-app-bar color="blue">
      <v-app-bar-title>Hashtag Misleading</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <OverviewTable />
      <UpSet />
      <TweetGallery />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import TweetGallery from './components/TweetGallery.vue';
import UpSet from './components/UpSet.vue';
import OverviewTable from './components/OverviewTable.vue';
</script>

<style scoped>
</style>
