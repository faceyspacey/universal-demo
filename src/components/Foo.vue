<template>
  <div :class='$style.container'>
    <span>{{count}}</span>
    <button @click='count--'>DECREMENT</button>
    <button @click='count++'>INCREMENT</button>
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
  background purple
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
    margin-right 10px
</style>