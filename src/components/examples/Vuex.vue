<template>
  <div :class='$style.container'>
    <div>
      <h1 :class='$style.parent'>IM THE PARENT</h1>
      <span :class="{[$style.odd]: isOdd}">count: {{loading ? 'loading...' : count}}</span>
      <child></child>
      <button @click='multiplyAsync(amount)'>MULTIPLY ASYNC!</button>
      <input type='number' v-model.number='amount' placeholder='enter a number' />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Child from '../widgets/Child'

export default {
  components: {
    Child
  },
  data() {
    return {
      amount: undefined
    }
  },
  computed: {
    ...mapGetters([
      'count',
      'loading',
      'isOdd'
    ])
  },
  methods: mapActions([
    'multiplyAsync'
  ])
}
</script>

<style lang='stylus' module>
.container
  background teal
  position absolute
  top 0px
  left 0px 
  width 100vw
  height 100vh
  display flex
  align-items center
  justify-content center
  & > div
    width 500px
    background rgba(50,50,50, .3)
    padding 10px
    & > span
      color rgba(255,255,255, .5)
      font-size 32px
      margin-right 10px
      &.odd
        color black
.parent
  color white
  margin 2px
</style>