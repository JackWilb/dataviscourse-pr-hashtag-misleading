<template>
    <!--<v-table density="compact">-->
    <table id="overviewTable">
      <thead>
        <tr>
          <th>Attribute</th>
          <th>Support</th>
          <th>Oppose</th>
          <th>Alt</th>
          <th>Neutral</th>
        </tr> 
        <tr>
          <th></th>
          <th><TableAxis svg_id="axis-support" :total="tableTotals['Tweet text support']"></TableAxis></th>
          <th><TableAxis svg_id="axis-oppose" :total="tableTotals['Tweet text oppose']"></TableAxis></th>
          <th><TableAxis svg_id="axis-alt" :total="tableTotals['Tweet text alt']"></TableAxis></th>
          <th><TableAxis svg_id="axis-neutral" :total="tableTotals['Tweet text neutral']"></TableAxis></th>
        </tr> 
      </thead>
      <tbody>
        <tr v-for="(value,key) in tableRows">
          <td>{{ key }}</td>
          <td v-for="sentimentType in sentimentTypes">
            <TableCell 
              :x="value[sentimentType]" 
              :total="tableTotals[sentimentType]"
            ></TableCell>
          </td>
        </tr>
      </tbody>
    </table>
</template>

<script setup lang="ts">
import { useDataStore } from '../stores/data';
import { SentimentOptions } from '../types';
import { select, selectAll } from 'd3-selection';
import { axisBottom } from 'd3-axis';
import { scaleLinear, ScaleLinear } from 'd3-scale';
import TableCell from './TableCell.vue';
import TableAxis from './TableAxis.vue';
import { computed } from 'vue';

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

// Create legends
//const legendSvgs: { [key: string]: Object } = {};
//sentimentTypes.forEach((sentimentType) => {
//  legendSvgs[sentimentType] = 
//});

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

</style>
