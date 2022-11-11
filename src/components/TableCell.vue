<template>
    <svg width=120 height=30>
        <rect
            :x="margin"
            y=5
            height=20
            :width="cx - margin"
        >
        </rect>

        <text 
            :x="cx+5" 
            y=18 
            class="dot-text"
        >
            {{ numericText }}
        </text>
    </svg>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import { scaleLinear, ScaleLinear } from 'd3-scale';
    import { format } from 'd3-format';

    const props = defineProps<{
        x: number
        total: number
        showCounts: boolean
    }>();

    const margin = 15;

    let xScale: ScaleLinear<number, number>;
    xScale = scaleLinear()
    .domain([0, props.total])
    .range([margin, 120-margin]);

    const cx = computed(() => { return xScale(props.x) });

    const numericText = computed(() => { 
        return props.showCounts ? format('d')(props.x) : format('.0%')(props.x/props.total) 
    });

</script>

<style>
rect {
    fill: #1DA1F2;
}

line {
    stroke: lightgray;
}

text.dot-text {
    text-anchor: start;
    font-size:  13px;
    font-weight: 800;
}
</style>