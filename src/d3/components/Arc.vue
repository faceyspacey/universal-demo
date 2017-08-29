<template>
  <g class="arc-group">
    <path
      :fill='fill'
      :fillRule='fillRule'
      :stroke='stroke'
      :strokeOpacity='strokeOpacity'
      :transform='transform'
      :d="d()"
    ></path>

    <text 
      v-if="showLabel"
      class="arc-text"
      :dy="belowHalfwayPoint ? 22 : -11"
      fill="black"
      stroke="black"
      :transform='transform'
    >
      <textPath
        v-if='showPartThatWontRenderServerSide'
        startOffset="50%"
        :style="{'text-anchor': 'middle'}"
        v-bind:xlink:href="`#donutArc-${arcIndex}`"
      >
      {{label}}
      </textPath>
    </text>

    <path
      v-if="showLabel"
      :fillRule='fillRule'
      :stroke='stroke'
      :strokeOpacity='strokeOpacity'
      class="hiddenDonutArcs"
      :id="`donutArc-${arcIndex}`"
      fill="none"
      :d="dLabel"
    ></path>
  </g>
</template>

<script>
import arc from "d3-shape/src/arc";
import PaintMixin from "../mixins/paint";
import ArcMixin from "../mixins/arc";

export default {
  mixins: [PaintMixin, ArcMixin],
  props: {
    startAngle: {
      type: Number,
      required: true
    },
    endAngle: {
      type: Number,
      required: true
    },
    label: {

    },
    arcIndex: {
      type: Number
    },
    transform: {
      type: String
    }
  },
  data() {
    return {
      showPartThatWontRenderServerSide: false
    }
  },
  mounted() {
    this.showPartThatWontRenderServerSide = true
  },
  computed: {
    belowHalfwayPoint() {
      const {endAngle, startAngle} = this;
      return endAngle > 90 * Math.PI/180;
    },
    showLabel() {
      const {label} = this;
      return label && typeof label !== "undefined"
    },
    d() {
      const {innerRadius, outerRadius, startAngle, endAngle, cornerRadius, padRadius, padAngle} = this;

      return arc()
        .outerRadius(outerRadius)
        .innerRadius(innerRadius)
        .startAngle(startAngle)
        .endAngle(endAngle)
        .cornerRadius(cornerRadius)
        .padRadius(padRadius)
        .padAngle(padAngle);
    },
    dLabel() {
      const {d, endAngle, belowHalfwayPoint} = this;
      const firstArcRegex = /(^.+?)L/;

      let newArc = firstArcRegex.exec(d())[1].replace(/,/g , " ");

      if (belowHalfwayPoint) {
        const startLocationRegex = /M(.*?)A/;
        const middleLocationRegex = /A(.*?)0 0 1/;
        const endLocationRegex = /0 0 1 (.*?)$/;

        const newStart = endLocationRegex.exec(newArc)[1];
        const newEnd = startLocationRegex.exec(newArc)[1];
        const newMiddle = middleLocationRegex.exec(newArc)[1];

        newArc = `M${newStart}A${newMiddle}0 0 0 ${newEnd}`;
        return newArc;
      }

      return newArc;
    }
  }
}
</script>

<style>

</style>
