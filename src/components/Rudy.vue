<template>
  <div :class='$style.container'>
    Fade In: <input type="range" v-model="fadeInDuration" min="0" v-bind:max="maxFadeDuration">
    Fade Out: <input type="range" v-model="fadeOutDuration" min="0" v-bind:max="maxFadeDuration">

    <transition
      v-bind:css='false'
      v-on:before-enter='beforeEnter'
      v-on:enter='enter'
      v-on:leave='leave'
    >
      <p v-if='show'>hello</p>
    </transition>

    <button
      v-if='stop'
      v-on:click='startAnimating'
    >Start animating</button>
    
    <button
      v-else
      v-on:click='stopAnimating'
    >Stop it!</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      stop: true,
      fadeInDuration: 2000,
      fadeOutDuration: 2000,
      maxFadeDuration: 10000
    }
  },
  mounted: function () {
    this.show = false
  },
  methods: {
    startAnimating() {
      this.stop = false
      this.show = false 
    },
    stopAnimating() {
      this.stop = true
    },
    beforeEnter(el) {
      console.log('BEFORE')
      el.style.opacity = 0
    },
    enter(el, done) {
      console.log('ENTER')

      Velocity(el,
        { opacity: 1 },
        {
          duration: this.fadeInDuration,
          complete: () => {
            done()
            console.log('HELP', !this.stop, this.show)
            if (!this.stop) this.show = false
          }
        }
      )
    },
    leave(el, done) {
      console.log('LEAVE')

      Velocity(el,
        { opacity: 0 },
        {
          duration: this.fadeOutDuration,
          complete: () => {
            done()
            this.show = true
          }
        }
      )
    }
  }
}
</script>

<style lang='stylus' module>
.container
  background rgb(255, 190, 0)
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