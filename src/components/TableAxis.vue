<template>
    <svg :id="props.svg_id"></svg>
</template>

<script setup lang="ts">
    import { computed, onMounted } from 'vue';
    import { select, selectAll } from 'd3-selection';
    import { axisBottom } from 'd3-axis';
    import { scaleLinear, ScaleLinear } from 'd3-scale';

    const props = defineProps<{
        svg_id: string
        total: number
    }>();

    const margin = 15;

    onMounted(() => {
        let xScale: ScaleLinear<number, number>;
        xScale = scaleLinear()
        .domain([0, props.total])
        .range([margin, 120-margin]);

        const cellSvg = select(`#${props.svg_id}`);

        cellSvg
        .attr('width', 120)
        .attr('height', 30);

        cellSvg
        .append('g')
        .call(axisBottom(xScale).ticks(3, 's'));
    });
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