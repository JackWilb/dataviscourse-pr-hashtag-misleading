<template>
  <div
    id="tweet-gallery"
    class="mt-12 bg-grey-lighten-3"
  >

    <v-row class="px-6">
      <v-col cols="4">
        <v-autocomplete
          v-model="searchSelected"
          v-model:search="searchInput"
          :items="searchItems"
          label="Search by Tweet ID"
          hide-no-data
          variant="solo"
        />
      </v-col>

      <v-col>
        <v-btn
          color="red"
          class="mt-3"
          @click="searchClear"
        >
          <v-icon class="pr-2">mdi-close-circle-outline</v-icon>
          Clear search
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="px-6">
      <v-col
        cols="2"
        v-for="tweet in store.filteredTweetData.slice(startingTweetIndex, endingTweetIndex)"
        :key="tweet.tweet_id"
      >
        <blockquote
          class="twitter-tweet"
          width="250"
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

// Autocomplete variables
const searchSelected = ref<string>('');
const searchInput = ref('');
const searchItems = computed(() => {
  return searchInput.value.length > 3 ? 
    store.tweetData
      .map((tweet) => tweet.tweet_id)
      .filter((tweet_id) => tweet_id.includes(searchInput.value))
    : [searchSelected.value];
});
watch(searchSelected, () => store.updateFilters('tweetIDs', searchSelected.value))
function searchClear() {
  searchSelected.value = ''
}
// Pagination variables
const pageNumber = ref(1);
const numberOfTweets = computed(() => store.filteredTweetData.length);
const TWEETS_PER_PAGE = 12;
const startingTweetIndex = computed(() => (pageNumber.value - 1) * TWEETS_PER_PAGE)
const endingTweetIndex = computed(() => startingTweetIndex.value + TWEETS_PER_PAGE);

// Functions to reload the tweet gallery as the DOM is updated
onMounted(() => {
  twttr.widgets.load()
});
onUpdated(() => {
  twttr.widgets.load()
});
watch(pageNumber, () => {
  console.log(pageNumber);
  twttr.widgets.load()
});
</script>

<style scoped>
</style>
