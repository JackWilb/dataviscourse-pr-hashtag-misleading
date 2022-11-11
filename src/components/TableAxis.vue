<template>
    <svg :id="props.svg_id" width="150" height="30">
        <g class="axis"></g>
    </svg>
</template>

<script setup lang="ts">
    import { computed, onMounted, onUpdated } from 'vue';
    import { select, selectAll } from 'd3-selection';
    import { axisBottom } from 'd3-axis';
    import { transition } from 'd3-transition';
    import { scaleLinear, ScaleLinear } from 'd3-scale';

    const props = defineProps<{
        svg_id: string
        total: number
        showCounts: boolean
    }>();

    const margin = 25;

    function drawAxis() {
        let xScale: ScaleLinear<number, number>;
        xScale = scaleLinear()
        .domain([0, props.showCounts ? props.total : 100])
        .range([margin, 150-margin]);
        const axis = axisBottom(xScale).ticks(3, 's');

        selectAll(`#${props.svg_id} > g.axis`).transition().call(axis);
    };

    onMounted(() => { drawAxis() });

    onUpdated(() => { drawAxis() });

</script>

<style>
line {
    stroke: lightgray;
}

.dot-text {
    font-size: 11px;
    text-anchor: middle
}
</style>