<template>
  <div :class='$style.container'>
    <h1 :class='$style.title'>IM A SEPARATE COMPONENT COMMUNICATING VIA VUEX</h1>
    <button @click='decrement'>DECREMENT</button>
    <button @click='increment'>INCREMENT</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'


export default {
  methods: mapActions([
    'increment',
    'decrement'
  ])
}
</script>

<style lang='stylus' module>
.container
  padding 10px
  margin 10px 0
  border: 2px dashed rgba(255,255,255, .9)
.title
  color rgba(255,255,255, .6)
  font-size 24px
</style>