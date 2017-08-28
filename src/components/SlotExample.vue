<template>
  <div>
    <slot name='checkboxes'></slot>
    <h1>{{title}}</h1>
    <slot></slot>
    <h2>{{caption}}</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Above is a named slot and Below is a default slot!',
      caption: '*oh, and the css here is scoped instead of modules like the others'
    }
  }
}
</script>

<style lang='stylus' scoped>
h1
  color white
  font-size 30px
h2
  color rgba(255, 255, 255, .7)
  font-size 16px
  -webkit-font-smoothing antialiased
  border-bottom 1px dashed white
</style>