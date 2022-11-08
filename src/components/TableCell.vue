<template>
    <svg width=120 height=30>
        <line 
            :x1="margin" 
            :x2="120-margin"
            y1=20
            y2=20
        >
        </line>

        <text 
            :x="cx" 
            y=12 
            class="dot-text"
        >
            {{ x }}
        </text>
        
        <circle 
            r=5 
            :cx="cx" 
            cy=20 
            :fill="props.x === 0 ? 'lightgray' : 'black'"
        ></circle>
    </svg>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import { scaleLinear, ScaleLinear } from 'd3-scale';

    const props = defineProps<{
        x: number
        total: number
    }>();

    const margin = 15;

    let xScale: ScaleLinear<number, number>;
    xScale = scaleLinear()
    .domain([0, props.total])
    .range([margin, 120-margin]);

    const cx = computed(() => { return xScale(props.x) });

</script>

<style>
line {
    stroke: lightgray;
}

text.dot-text {
    font-size: 10px;
    text-anchor: middle
}
</style>