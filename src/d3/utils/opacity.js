export default {
  type: Number,
  default: 1,
  validator: v => v >= 0.0 && v <= 1.0
}
