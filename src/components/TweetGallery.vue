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

    <v-pagination
      v-model="pageNumber"
      :length="numberOfTweets / TWEETS_PER_PAGE"
      class="mb-12"
    ></v-pagination>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUpdated, ref, watch } from 'vue';
import { useDataStore } from '../stores/data';

const store = useDataStore();

const pageNumber = ref(0);
const numberOfTweets = computed(() => store.tweetData.length);
const TWEETS_PER_PAGE = 12;
const startingTweetIndex = computed(() => pageNumber.value * TWEETS_PER_PAGE)
const endingTweetIndex = computed(() => startingTweetIndex.value + TWEETS_PER_PAGE);

onMounted(() => {
  twttr.widgets.load()
});
onUpdated(() => {
  twttr.widgets.load()
});
watch(pageNumber, () => {
  twttr.widgets.load()
});
</script>

<style scoped>
</style>
