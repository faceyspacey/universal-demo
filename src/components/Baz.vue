<template>
  <div :class='$style.container'>
    <div :class='$style.checkboxes'>
      <div slot='checkboxes'>
        <input type='checkbox' id='Tobias' value='Tobias' v-model='checkedNames'>
        <label for='Tobias'>Tobias</label>
        <input type='checkbox' id='Sean' value='Sean' v-model='checkedNames'>
        <label for='Sean'>Sean</label>
        <input type='checkbox' id='James' value='James' v-model='checkedNames'>
        <label for='James'>James</label>
      </div>

      <slot-example>
        <span>Checked names: {{ checkedNames }}</span>
      </slot-example>
    </div>
  </div>
</template>

<script>
import SlotExample from './SlotExample'

export default {
  components: {
    SlotExample
  },
  data() {
    return {
      checkedNames: ['Tobias', 'James', 'Sean']
    }
  }
}
</script>

<style lang='stylus' module>
.container
  background green
  position absolute
  top 0px
  left 0px 
  width 100vw
  height 100vh
  display flex
  align-items center
  justify-content center
  & .checkboxes
    width 445px
  & span
    color rgba(255,255,255, .5)
    font-size 20px
</style>