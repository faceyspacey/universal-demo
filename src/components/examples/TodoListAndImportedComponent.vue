<template>
  <div :class='$style.container'>
    <div>
      <h1>Grocery List</h1>
      <input v-model='newItem' placeholder='add a new item' />
      <input type='button' value='add' @click='add' />

      <br /><br />

      <todo
        v-for='(item, index) in items'
        v-bind:todo='item'
        v-bind:key='item.id'
        @remove='remove(item.id)'
      />
    </div>
  </div>
</template>

<script>
import Todo from '../widgets/Todo.vue'

export default {
  components: {
    Todo
  },
  data() {
    return {
      newItem: '',
      items: [{
        id: 0,
        text: 'Vegetables'
      }, {
        id: 1,
        text: 'Cheese'
      }, {
        id: 2,
        text: 'Whatever else humans are supposed to eat'
      }]
    }
  },
  methods: {
    add() {
      if (!this.newItem) return alert('enter some text buddy')

      const lastItem = this.items[this.items.length - 1]

      this.items.push({
        id: lastItem ? lastItem.id + 1 : 0,
        text: this.newItem
      })

      this.newItem = ''
    },
    remove(id) {
      this.items = this.items.filter(item => item.id !== id)
    }
  }
}
</script>

<style lang='stylus' module>
.container
  background rgb(255, 84, 0)
  position absolute
  top 0px
  left 0px 
  width 100vw
  height 100vh
  display flex
  align-items center
  justify-content center
  & h1
    color rgba(255,255,255, .5)
    font-size 32px
    margin-bottom 2px
</style>