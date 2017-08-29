<template>
  <div id="ColorBarGraph">
    <svg :height="height" :width="width">
      <g :transform="`translate(${computedMargin.left}, ${computedMargin.top})`">
        <rect v-for="(mod, index) in domain.chunks"
          :key="mod.id"
          :height="yScale(mod.size) + 10"
          :width="xScale.bandwidth()"
          :x="xScale(index)"
          :y="h - yScale(mod.size)"
          :fill="colorScale(index)"
          :stroke="strokeColorScale(getChunkType(mod))"
          :stroke-width="2"
        >
        </rect>
      </g>
    </svg>
  </div>
</template>

<script>
import scaleLinear from "d3-scale/src/linear";
import scaleBand from "d3-scale/src/band";
import scaleQuantize from "d3-scale/src/quantize";
import max from "d3-array/src/max";

import GraphMixin from "../mixins/graph";

export default {
  name: "color-bar-graph",
  mixins: [GraphMixin],
  computed: {
    yScale() {
      const {domain, h} = this; // depends on something with h, domain

      return scaleLinear()
        .domain([0, max(domain.chunks, mod=>mod.size)]) // depends on something array: size
        .range([0, h-2]);
    },
    xScale() {
      const {domain, w} = this; // depends on something with w, domain

      return scaleBand()
        .domain(domain.chunks.map(m => m.id)) // depends on something array: id
        .range([0, w])
        .paddingInner(0.05)
        .paddingOuter(0.03)

    },
    colorScale() {
      const {domain, w} = this;

      return scaleLinear()
        .domain([0, domain.chunks.length])
        .range(["lightblue", "steelblue"])
    },
    strokeColorScale() {
      return scaleQuantize()
        .domain([0, 1, 2])
        .range(["red", "orange", "green"])
    }
  },
  methods: {
    getChunkType(chunk) {
      if (chunk.entry) {
        return 0;
      }

      if (chunk.initial && !chunk.entry) {
        return 1;
      }

      return 2;
    }
  }
}
</script>

<style>
#ColorBarGraph {
  background: whitesmoke;
}

rect.bar {
  fill: black;
}
</style>
