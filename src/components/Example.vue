<template>
  <div :class='$style.container'>
    <div :class='$style.checkboxes'>
      <input type='checkbox' id='jack' value='Jack' v-model='checkedNames'>
      <label for='jack'>Jack</label>
      <input type='checkbox' id='john' value='John' v-model='checkedNames'>
      <label for='john'>John</label>
      <input type='checkbox' id='mike' value='Mike' v-model='checkedNames'>
      <label for='mike'>Mike</label>

      <br><br><br>

      <span>Checked names: {{ checkedNames }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        checkedNames: ['Jack', 'John', 'Mike']
      }
    }
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
  & .checkboxes
    width 400px
  & span
    color rgba(255,255,255, .5)
    font-size 20px
</style>