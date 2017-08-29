<template>
  <div id="Graph">
    <svg :height="height" :width="width">
      <g :transform="`translate(${computedMargin.left}, ${computedMargin.top})`">
        <rect v-for="(mod, index) in domain.chunks"
          :key="mod.id"
          :height="yScale(mod.size) + 10"
          :width="xScale.bandwidth()"
          :x="xScale(index)"
          :y="h - yScale(mod.size)"
        >
        </rect>
      </g>
    </svg>
  </div>
</template>

<script>
import scaleLinear from "d3-scale/src/linear";
import scaleBand from "d3-scale/src/band";
import max from "d3-array/src/max";

import GraphMixin from "../mixins/graph";

export default {
  name: "bar-graph",
  mixins: [GraphMixin],
  computed: {
    yScale() {
      const {domain, h} = this; // depends on something with h, domain

      return scaleLinear()
        .domain([0, max(domain, mod=>mod.size)]) // depends on something array: size
        .range([0, h-2]);
    },
    xScale() {
      const {domain, w} = this; // depends on something with w, domain

      return scaleBand()
        .domain(domain.map(m => m.id)) // depends on something array: id
        .range([0, w])
        .paddingInner(0.05)
        .paddingOuter(0.03)

    }
  }
}
</script>

<style>
#BarGraph {
  background: lightblue;
}

rect.bar {
  fill: black;
}
</style>
