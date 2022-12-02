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
        :cols="numberOfCols"
        v-for="tweet in filteredTweetData.slice(startingTweetIndex, endingTweetIndex)"
        :key="tweet.tweet_id"
      >
        <blockquote
          class="twitter-tweet unloaded"
          width="250"
        >
          <a :href="`https://twitter.com/twitter/status/${tweet.tweet_id}`" disabled>loading</a> 
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
const filteredTweetData = computed(() => store.filteredTweetData)
watch(filteredTweetData, () => {
  pageNumber.value = 1
});

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
watch(searchSelected, () => {
  store.updateFilters('tweetIDs', searchSelected.value)
})
function searchClear() {
  searchSelected.value = ''
}

// Pagination variables
const pageNumber = ref(1);
const numberOfTweets = computed(() => filteredTweetData.value.length);
const TWEETS_PER_PAGE = 12;
const numberOfCols = computed(() => Math.ceil(12 / (pageWidth.value / 275)))
const startingTweetIndex = computed(() => (pageNumber.value - 1) * TWEETS_PER_PAGE)
const endingTweetIndex = computed(() => startingTweetIndex.value + TWEETS_PER_PAGE);

// Functions to reload the tweet gallery as the DOM is updated
const currentTimeout = ref(0);
async function setTweetsAsMissing() {
  const numberOfSecondsToWait = 60 * 1000;
  currentTimeout.value = setTimeout(() => {
    // Get all remaining "loading"
    const unloadedTweets = document.getElementsByClassName('unloaded');

    if (unloadedTweets.length > 0) {
      Array.from(unloadedTweets).forEach((unloadedTweet) => {
        // Remove the loading a tag
        if (unloadedTweet.firstChild !== null) {
          unloadedTweet.removeChild(unloadedTweet.firstChild);
        }

        // Create a new html node saying that the tweet is missing
        const newNode = document.createElement('div');
        newNode.innerHTML = 'There was a network error while fetching the data. The tweet may have been deleted.';
        newNode.style.marginTop = '10px';

        // Add the new node to the unloaded tweet
        unloadedTweet.appendChild(newNode);
      })
    }
  }, numberOfSecondsToWait);
}

const pageWidth = ref(window.innerWidth);
function onWidthChange() {
  pageWidth.value = window.innerWidth;
}

onMounted(() => {
  // Add listener for resize to track current width
  window.addEventListener('resize', onWidthChange)

  clearTimeout(currentTimeout.value);
  twttr.widgets.load();
  setTweetsAsMissing();
});
onUpdated(() => {
  clearTimeout(currentTimeout.value);
  twttr.widgets.load();
  setTweetsAsMissing();
});
watch(pageNumber, () => {
  clearTimeout(currentTimeout.value);
  twttr.widgets.load();
  setTweetsAsMissing();
});
</script>

<style scoped>
a[disabled], a[disabled]:hover {
  pointer-events: none;
  text-decoration: none;
  color: black;
}
</style>

<style>
.twitter-tweet-rendered {
  margin-left: auto;
  margin-right: auto;
}
</style>
