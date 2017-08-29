<template>
  <svg class="line-graph" :height="height" :width="width">
    <path fill="none" stroke="black" :transform="`translate(${margin.top}, ${margin.left})`"
      :d="d">
    </path>
  </svg>
</template>

<script>
import line from "d3-shape/src/line";
import extent from "d3-array/src/extent";
import scaleTime from "d3-scale/src/time";
import scaleLinear from "d3-scale/src/linear";

import GraphMixin from "../mixins/graph";

export default {
  name: "time-line-graph",
  mixins: [GraphMixin],
  computed: {
    d() {
      const {domain, xScale, yScale} = this;

      return line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.value))(domain);
    },
    xScale() {
      const {w, domain} = this;

      return scaleTime()
        .domain(extent(domain, d => d.date))
        .range([0, w])
    },
    yScale() {
      const {h, domain} = this;

      return scaleLinear()
        .domain(extent(domain, d => d.value))
        .range([h, 0])
    }
  }
}
</script>

<style>
  .line-graph {
    background: lightcyan;
  }
</style>
