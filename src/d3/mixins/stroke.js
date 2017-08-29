import OpacityProp from '../utils/opacity'

export default {
  props: {
    stroke: {
      type: String
    },
    strokeOpacity: OpacityProp
  },
  computed: {
    strokeProps() {
      const { stroke, strokeOpacity } = this

      return {
        stroke,
        strokeOpacity
      }
    }
  }
}
