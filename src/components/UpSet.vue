<template>
  <div id="upset" :style="`width: ${upsetWidth}px`"></div>
</template>

<script setup lang="ts">
import { extractSets, generateCombinations, renderUpSet } from '@upsetjs/bundle';
import { computed, onMounted, watch } from 'vue';
import { useDataStore } from '../stores/data';

const store = useDataStore();

const elems = computed(() => store.upsetData);
const sets = computed(() => extractSets(elems.value));
const combinations = computed(() => generateCombinations(sets.value, {
  type: 'intersection',
  min: 1,
  limit: 10,
  order: 'cardinality:desc',
}));

let selection: unknown[] = [];

function onHover(set: any) {
  selection = set;
  rerender();
}

const upsetWidth = 900;
const widthRatios: [number, number] = [0.15, 0.3];
function rerender() {
  const upsetElement = document.getElementById('upset');
  const props = { 
    sets: sets.value, 
    combinations: combinations.value, 
    width: upsetWidth, 
    height: 800, 
    selection, 
    onHover, 
    widthRatios, 
    fontSizes: { setLabel: '10pt' },
    color: '#333333',
    selectionColor: '#1DA1F2',
  };

  if (upsetElement !== null) {
    renderUpSet(upsetElement, props);
  }
}

onMounted(() => rerender());
watch(elems, ()  => rerender());
</script>

<style scoped>
</style>
