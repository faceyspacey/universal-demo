<template>
  <div :class='$style.container'>
    <div :class='$style.outter'>
      <h1>OH YES D3 WORKS HERE TOO!</h1>

      <div :class='$style.inner'>
        <arcs-graph :height='200' :width='200'
          :outer-radius='150' :inner-radius='80'
          :pad-angle='.3' :pad-radius='10'
          :domain='webpackModules'
          :colors="['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']"
          value-accessor='size' label-accessor='size'
        ></arcs-graph>

        <time-line-graph :height='200' :width='200' :domain='timelineData'></time-line-graph>
      </div>
      
    </div>
  </div>
</template>

<script>
import data from '../../d3/assets/stats.json'
import ArcsGraph from '../../d3/components/ArcsGraph'
import TimeLineGraph from '../../d3/components/TimeLineGraph'

export default {
  data() {
    return {
      webpackModules: data,
      timelineData: [
        {date: new Date(2007, 3, 24), value: 93.24},
        {date: new Date(2007, 3, 25), value: 95.35},
        {date: new Date(2007, 3, 26), value: 98.84},
        {date: new Date(2007, 3, 28), value: 99.92},
        {date: new Date(2007, 3, 30), value: 99.80},
        {date: new Date(2007, 4,  1), value: 99.47}
      ]
    };
  },
  components: {
    TimeLineGraph,
    ArcsGraph
  },
  computed: {
  },
  methods: {
    chunksWithModules() {
      const { webpackModules } = this
      const { modules, chunks } = webpackModules
      let newChunks = chunks.map(chunk => {
        chunk['modules'] = []
        return chunk
      })

      for (const module in modules) {
        const moduleObject = modules[module]

        moduleObject['chunks'].forEach(chunkId => {
          const chunkObject = newChunks[chunkId]
          newChunks[chunkId]['modules'].push(moduleObject)
        })
      }

      newChunks = newChunks.map(chunk => {
        chunk.modules = chunk.modules.sort((a, b) => a.id - b.id)
        return chunk
      });

      return newChunks
    }
  }
}
</script>

<style lang='stylus' module>
.container
  background blue
  position absolute
  top 0px
  left 0px 
  width 100vw
  height 100vh
  display flex
  align-items center
  justify-content center
  & h1
    color rgba(255, 255, 255, .7)
    font-size 16px
    -webkit-font-smoothing antialiased

.outter h1
  text-align center
  font-size 32px

.inner
  width 100%
  display flex
  justify-content center
</style>
