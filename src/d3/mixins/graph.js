export default {
  props: {
    domain: {
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    margin: {
      type: Object,
      default: () => ({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      })
    }
  },
  computed: {
    computedMargin() {
      const { margin } = this
      return Object.assign({ top: 0, left: 0, bottom: 0, right: 0 }, margin)
    },
    h() {
      const { computedMargin, height } = this
      const { top, bottom } = computedMargin
      return height - top - bottom
    },
    w() {
      const { computedMargin, width } = this
      const { left, right } = computedMargin
      return width - left - right
    }
  }
}
