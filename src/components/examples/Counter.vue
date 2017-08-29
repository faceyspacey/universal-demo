<template>
  <div :class='$style.container'>
    <div>
      <h1>THIS IS AN SFC MADE /W VUE</h1>
      <span>{{count}}</span>
      
      <button @click='count--'>DECREMENT</button>
      <button @click='count++'>INCREMENT</button>
    </div>
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
  & h1
    color rgba(255,255,255, .9)
    font-size 36px
  & span
    color rgba(255,255,255, .5)
    font-size 32px
    margin-right 10px
</style>