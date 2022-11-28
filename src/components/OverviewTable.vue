<template>
    <table id="overviewTable">
      <thead>
        <tr>
          <th>Attribute</th>
          <th @click="clickHandler('Tweet text support')" 
              @mouseover="hover = 'Tweet text support'" 
              @mouseleave="hover = ''" 
              :class="{ hovered: (hover==='Tweet text support'), selected: (store.getCategoryFilters().includes('Tweet text support'))}"
            >Support</th>
          <th @click="clickHandler('Tweet text oppose')" 
              @mouseover="hover = 'Tweet text oppose'" 
              @mouseleave="hover = ''" 
              :class="{ hovered: (hover==='Tweet text oppose'), selected: (store.getCategoryFilters().includes('Tweet text oppose'))}"
            >Oppose</th>
          <th @click="clickHandler('Tweet text alt')" 
              @mouseover="hover = 'Tweet text alt'" 
              @mouseleave="hover = ''" 
              :class="{ hovered: (hover==='Tweet text alt'), selected: (store.getCategoryFilters().includes('Tweet text alt'))}"
            >Alt</th>
          <th @click="clickHandler('Tweet text neutral')" 
              @mouseover="hover = 'Tweet text neutral'" 
              @mouseleave="hover = ''" 
              :class="{ hovered: (hover==='Tweet text neutral'), selected: (store.getCategoryFilters().includes('Tweet text neutral'))}"
            >Neutral</th>
        </tr> 
        <tr>
          <th>
            <v-switch
              v-model="showCounts"
              hide-details
              inset
              :label="`Showing ${showCounts ? 'count' : 'percent'}`"
            ></v-switch>
          </th>
          <th><TableAxis svg_id="axis-support" :total="tableTotals['Tweet text support']" :showCounts="showCounts"></TableAxis></th>
          <th><TableAxis svg_id="axis-oppose" :total="tableTotals['Tweet text oppose']" :showCounts="showCounts"></TableAxis></th>
          <th><TableAxis svg_id="axis-alt" :total="tableTotals['Tweet text alt']" :showCounts="showCounts"></TableAxis></th>
          <th><TableAxis svg_id="axis-neutral" :total="tableTotals['Tweet text neutral']" :showCounts="showCounts"></TableAxis></th>
        </tr> 
      </thead>
      <tbody>
        <tr v-for="(value,key) in tableRows">
          <td @click="clickHandler(key as string)" 
              @mouseover="hover = key as string" 
              @mouseleave="hover = ''" 
              :class="{ hovered: (hover===key), selected: (store.getCategoryFilters().includes(key as string))}"
            >{{ key }}</td>
          <td v-for="sentimentType in sentimentTypes">
            <TableCell 
              :x="value[sentimentType]" 
              :total="tableTotals[sentimentType]"
              :showCounts="showCounts"
            ></TableCell>
          </td>
        </tr>
      </tbody>
    </table>
</template>

<script setup lang="ts">
import { useDataStore } from '../stores/data';
import { SentimentOptions } from '../types';
import { computed, ref } from 'vue';
import TableCell from './TableCell.vue';
import TableAxis from './TableAxis.vue';

// Load data
const store = useDataStore();
const tableRows = computed(() => store.tableData.tableRows);
const tableTotals = computed(() => store.tableData.tableTotals);
const sentimentTypes: SentimentOptions[] = [
      'Tweet text support',
      'Tweet text oppose',
      'Tweet text alt',
      'Tweet text neutral',
    ];
const showCounts = ref(false);
const hover = ref<string>('');

function clickHandler(key: string) {
  store.updateFilters("clickedCategories", key);
}

</script>

<style scoped>

table#overviewTable {
  font-size: 13px;
  font-family: "Helvetica Neue", Roboto, "Segoe UI", Calibri, sans-serif;
  border: 1px solid lightgray;
  border-radius: 15px;
  padding: 15px;
  margin: 25px 25px;
}

th {
  font-weight: bold;
  font-size: 15px;
  vertical-align: center;
  text-align: center;
  padding-right: 6px;
  padding-bottom: 0px;
  min-width: 125px;
}

th:first-of-type {
  text-align: left;
  min-width: 140px;
}

td:first-of-type {
  text-align: left;
}

td {
  text-align: center;
  padding-top: 0px;
  padding-bottom: 0px;
  padding-right: 5px;
  padding-left: 5px;
  color:black;
}

.hovered {
  background-color: #F5F8FA;
}

.selected {
  background-color: #E1E8ED;
  font-weight: bold;
}

</style>
