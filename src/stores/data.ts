import { defineStore } from 'pinia';
import { ref } from 'vue';
import { csv } from 'd3';
import { Tweet } from '../types';

export const useDataStore = defineStore('data', () => {
  const tweetData = ref<Tweet[]>([]);
  
  async function getTweetData() {
    tweetData.value = await csv('tweet_data.csv') as any[];
  }

  return { tweetData, getTweetData }
})
