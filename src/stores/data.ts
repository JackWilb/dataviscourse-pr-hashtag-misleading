import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { csv } from 'd3';
import { Filter, RowData, RowLabelOptions, SentimentOptions, Tweet } from '../types';

export const useDataStore = defineStore('data', () => {
  const filters = ref<Filter>({ tweetIDs: [], clickedCategories: [] });
  function updateFilters(type: 'tweetIDs' | 'clickedCategories', value: string) {
    if (value === '') {
      filters.value[type] = []
    } else if (filters.value[type].includes(value)){
      filters.value[type] = filters.value[type].filter((IDOrCategory) => IDOrCategory !== value)
    } else {
      filters.value[type].push(value);
    }
  }

  const tweetData = ref<Tweet[]>([]);
  const filteredTweetData = computed(() => {
    return tweetData.value
      .filter((tweet) => (
        // Include this tweet if there is no tweet filter, or the tweet is in filters
        (
          filters.value.tweetIDs.length === 0
          || filters.value.tweetIDs.includes(tweet.tweet_id)
        )
        && (
          filters.value.clickedCategories.length === 0
          || filters.value.clickedCategories.map((clickedCategory) => tweet[clickedCategory as keyof Tweet]).every((value) => value === true)
        )
      ))
  })
  
  async function getTweetData() {
    tweetData.value = (await csv('tweet_data.csv')).map((row): Tweet => ({
      tweet_id: `${row.tweet_id}`,
      'Source unknown': row['Source unknown'] === 'True',
      'Source screenshot static': row['Source screenshot static'] === 'True',
      'Source screenshot dashboard': row['Source screenshot dashboard'] === 'True',
      'Title neutral': row['Title neutral'] === 'True',
      'Title support': row['Title support'] === 'True',
      'Title oppose': row['Title oppose'] === 'True',
      'Title alt': row['Title alt'] === 'True',
      'Native annotation neutral': row['Native annotation neutral'] === 'True',
      'Native annotation support': row['Native annotation support'] === 'True',
      'Native annotation oppose': row['Native annotation oppose'] === 'True',
      'Native annotation alt': row['Native annotation alt'] === 'True',
      'Added annotation neutral': row['Added annotation neutral'] === 'True',
      'Added annotation support': row['Added annotation support'] === 'True',
      'Added annotation oppose': row['Added annotation oppose'] === 'True',
      'Added annotation alt': row['Added annotation alt'] === 'True',
      'Use of annotations on chart': 
        (row['Native annotation neutral'] === 'True') || 
        (row['Native annotation support'] === 'True') || 
        (row['Native annotation oppose'] === 'True') ||
        (row['Native annotation alt'] === 'True') || 
        (row['Added annotation neutral'] === 'True') ||
        (row['Added annotation support'] === 'True') ||
        (row['Added annotation oppose'] === 'True') ||
        (row['Added annotation alt'] === 'True'),
      'Tweet text neutral': row['Tweet text neutral'] === 'True',
      'Tweet text support': row['Tweet text support'] === 'True',
      'Tweet text oppose': row['Tweet text oppose'] === 'True',
      'Tweet text alt': row['Tweet text alt'] === 'True',
      'Truncated axis': row['Truncated axis'] === 'True',
      'Dual axis': row['Dual axis'] === 'True',
      'Value as area/volume': row['Value as area/volume'] === 'True',
      'Inverted axis': row['Inverted axis'] === 'True',
      'Uneven binning': row['Uneven binning'] === 'True',
      'Unclear encoding': row['Unclear encoding'] === 'True',
      'Inappropriate encoding': row['Inappropriate encoding'] === 'True',
      'Cherry-picking': row['Cherry-picking'] === 'True',
      'Setting an arbitrary threshold': row['Setting an arbitrary threshold'] === 'True',
      'Causal inference': row['Causal inference'] === 'True',
      'Issues with data validity': row['Issues with data validity'] === 'True',
      'Failure to account for statistical nuance': row['Failure to account for statistical nuance'] === 'True',
      'Misrepresentation of scientific studies': row['Misrepresentation of scientific studies'] === 'True',
      'Incorrect reading of chart': row['Incorrect reading of chart'] === 'True',
    }));
  }

  const tableData = computed(() => {
    const rowLabels: RowLabelOptions[] = [
      // Reasoning errors
      'Cherry-picking',
      'Setting an arbitrary threshold',
      'Causal inference',
      'Issues with data validity',
      'Failure to account for statistical nuance',
      'Misrepresentation of scientific studies',
      'Incorrect reading of chart',
      // Misc construction
      'Use of annotations on chart',
      'Source screenshot static',
      'Source screenshot dashboard',
      // Design violations
      'Truncated axis',
      'Dual axis',
      'Value as area/volume',
      'Inverted axis',
      'Uneven binning',
      'Unclear encoding',
      'Inappropriate encoding',
    ];

    const sentimentTypes: SentimentOptions[] = [
      'Tweet text oppose',
      'Tweet text neutral',
      'Tweet text support',
      'Tweet text alt',
    ];

    // Fill in table rows
    const tableRows: { [key: string]: RowData } = {};

    rowLabels.forEach((rowLabel) => {
      const newRowData: RowData = {
        'Tweet text oppose': 0,
        'Tweet text neutral': 0,
        'Tweet text support': 0,
        'Tweet text alt': 0,
      };

      sentimentTypes.forEach((sentimentType) => {
        newRowData[sentimentType] = filteredTweetData.value
          .filter((tweet) => tweet[rowLabel] && tweet[sentimentType])
          .length
      });

      tableRows[rowLabel] = newRowData;
    });

    // Fill in table totals
    const tableTotals: { [key: string]: number } = {};

    sentimentTypes.forEach((sentimentType) => {
      tableTotals[sentimentType] = filteredTweetData
        .value
        .filter((tweet) => tweet[sentimentType])
        .length
    });

    // Return
    return { tableRows, tableTotals };
  });

  return { filteredTweetData, getTweetData, tableData, tweetData, updateFilters }
})
