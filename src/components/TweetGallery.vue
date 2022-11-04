<template>
  <blockquote
    v-for="tweet in store.tweetData.slice(0, 10)"
    class="twitter-tweet"
  >
    <a :href="`https://twitter.com/twitter/status/${tweet.tweet_id}`"></a> 
  </blockquote>

  <div ref="scriptBlock"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
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
  reloadTweets
});
</script>

<style scoped>
</style>
