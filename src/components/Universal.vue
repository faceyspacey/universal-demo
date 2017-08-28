<template>
  <div @click='count++' :class='$style.container'>
    <div>{{count}}</div>
    <span>Universal -- loaded!!</span>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        count: 0
      }
    }
  }
</script>

<style lang='stylus' module>
.container
  background black
  position absolute
  top 0px
  left 0px 
  width 100vw
  height 100vh
  display flex
  align-items center
  justify-content center
  & span
    color rgba(255,255,255, .5)
    font-size 32px
</style>