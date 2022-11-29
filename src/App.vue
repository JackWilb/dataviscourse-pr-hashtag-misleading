<template>
  <v-app>
    <v-app-bar color="blue">
      <v-app-bar-title>Hashtag Misleading</v-app-bar-title>
      
      <!-- <template v-slot:append>
        <v-btn
          icon
          @click="openGithub"
        >
          <v-icon>mdi-github</v-icon>
        </v-btn>
      </template> -->
    </v-app-bar>

    <v-main>
      <v-row>
        <v-col>
        <OverviewTable v-if="store.filteredTweetData.length > 0" class="mx-auto"/>
        </v-col>
        
        <v-col>
        <UpSet v-if="store.filteredTweetData.length > 0" class="mx-auto"/>
        </v-col>
      </v-row>

      <TweetGallery v-if="store.filteredTweetData.length > 0" />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import TweetGallery from './components/TweetGallery.vue';
import UpSet from './components/UpSet.vue';
import OverviewTable from './components/OverviewTable.vue';
import { useDataStore } from './stores/data';

const store = useDataStore();
store.getTweetData();

function openGithub() {
  window.open('https://github.com/JackWilb/dataviscourse-pr-hashtag-misleading/');
}

</script>

<style scoped>
</style>
