<template>
  <div id="upset"></div>
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

function rerender() {
  const upsetElement = document.getElementById('upset');
  const props = { sets: sets.value, combinations: combinations.value, width: 1500, height: 800, selection, onHover };

  if (upsetElement !== null) {
    renderUpSet(upsetElement, props);
  }
}

onMounted(() => rerender());
watch(elems, ()  => rerender());
</script>

<style scoped>
</style>
