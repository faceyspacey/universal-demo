import OpacityProp from '../utils/opacity'

export default {
  props: {
    fill: {
      type: String,
      default: ''
    },
    fillRule: {
      type: String,
      default: 'nonzero',
      validator: v => ['nonzero', 'evenodd', 'initial'].indexOf(v) > -1
    },
    fillOpacity: OpacityProp
  },
  computed: {
    fillProps() {
      const { fill, fillRule } = this

      return {
        fill,
        fillRule
      }
    }
  }
}
