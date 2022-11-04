<template>
  <div id="tweet-gallery">
    <v-row class="px-6">
      <v-col
        cols="2"
        v-for="tweet in store.tweetData.slice(startingTweetIndex, endingTweetIndex)"
        :key="tweet.tweet_id"
      >
  <blockquote
    class="twitter-tweet"
          width="300"
  >
    <a :href="`https://twitter.com/twitter/status/${tweet.tweet_id}`"></a> 
  </blockquote>
      </v-col>
    </v-row>

  </div>
</template>

<script setup lang="ts">
import { onMounted, onUpdated, ref } from 'vue';
import { useDataStore } from '../stores/data';

const store = useDataStore();

const scriptBlock = ref<Element | null>(null);

function reloadTweets() {
  if (scriptBlock.value !== null) {
    // Clear out old scripts
    scriptBlock.value.innerHTML = '';

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    script.setAttribute('charset', 'utf-8');

    scriptBlock.value.appendChild(script);
  }
}

onMounted(() => {
  twttr.widgets.load()
});
onUpdated(() => {
  twttr.widgets.load()
});
});
</script>

<style scoped>
</style>
