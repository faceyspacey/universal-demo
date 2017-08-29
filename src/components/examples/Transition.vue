<template>
  <div :class='$style.container'>
    <div>
      Fade In: <input type="range" v-model="fadeInDuration" min="0" v-bind:max="maxFadeDuration">
      Fade Out: <input type="range" v-model="fadeOutDuration" min="0" v-bind:max="maxFadeDuration">

      <transition
        v-bind:css='false'
        v-on:before-enter='beforeEnter'
        v-on:enter='enter'
        v-on:leave='leave'
      >
        <p v-if='show' :class='$style.looper'>IM A LOOPING {{transitionText}}</p>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      stop: true,
      fadeInDuration: 2000,
      fadeOutDuration: 500,
      maxFadeDuration: 5000,
      transitionText: '<TRANSITION />'
    }
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
      el.style.opacity = 0
    },
    enter(el, done) {
      Velocity(el,
        { opacity: 1 },
        {
          duration: this.fadeInDuration,
          complete: () => {
            done()
            if (!this.stop) this.show = false
          }
        }
      )
    },
    leave(el, done) {
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
  .looper
    color: rgba(255,255,255, .8)
    font-size 32px
</style>