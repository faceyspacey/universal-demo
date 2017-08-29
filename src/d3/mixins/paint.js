import FillMixin from '../mixins/fill'
import StrokeMixin from '../mixins/stroke'

export default {
  mixins: [FillMixin, StrokeMixin],
  computed: {
    paintProps() {
      const { fillProps, strokeProps } = this
      return {
        ...fillProps,
        ...strokeProps
      }
    }
  }
}
