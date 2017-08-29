export default {
  props: {
    outerRadius: {
      type: Number,
      required: true
    },
    innerRadius: {
      type: Number,
      default: 0
    },
    cornerRadius: {
      type: Number,
      default: 0
    },
    padAngle: {
      type: Number,
      default: 0
    },
    padRadius: {
      type: Number,
      default: 0
    }
  },
  computed: {
    arcProps() {
      const {
        innerRadius,
        outerRadius,
        cornerRadius,
        padAngle,
        padRadius
      } = this

      return {
        innerRadius,
        outerRadius,
        cornerRadius,
        padAngle,
        padRadius
      }
    }
  }
}
