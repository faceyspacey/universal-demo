import Vue from 'react-vue'
import Vuex from 'vuex'
import createStore from './src/createVuexStore'
// import VueMaterial from 'vue-material/src'

Vue.use(Vuex)
// Vue.use(VueMaterial)

// you gotta do this because the Vue object isn't a constructor that can be used
// with `new` as in a standard Vue app
const StorePlugin = {
  install(Vue) {
    Vue.prototype.$store = createStore()
  }
}

Vue.use(StorePlugin)

export default Vue
