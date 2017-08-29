<template>
  <li :class='$style.todo'>
    {{label}}: {{todo.text}} 
    <span @click='remove'>x</span>
  </li>
</template>

<script>
export default {
  props: ['todo'],
  data() {
    return {
      label: this.todo.id * 10
    }
  },
  methods: {
    remove(e, c) {
      this.$emit('remove')
    }
  }
}
</script>

<style lang='stylus' module>
.todo
  list-style none
  & span 
    color white
    font-size 15px
    position relative
    top -3px
    &:hover
      color blue
      cursor pointer
</style>