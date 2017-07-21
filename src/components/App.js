import React from 'react'
import universal from 'react-universal-component'
import styles from '../css/App.css'

const Page = 'Example'

const UniversalExample = universal(() => import('./Example'), {
  resolve: () => require.resolveWeak('./Example'),
  chunkName: 'Example', // babel-plugin-dual-import automatically sets chunkName based on path
  minDelay: 500
})

// const asyncWork = props =>
//   import(/* webpackChunkName: 'async/[request]' */ `./${props.page}`)

// const resolve = props =>
//   require.context('./', true, /^\.\/.*$/, true, '[request]')
//     .resolve(`${props.page}`)

// const UniversalExample = universal(asyncWork, {
//   resolve,
//   chunkName: props => `${props.page}`,
//   minDelay: 500
// })

export default class App extends React.Component {
  // set `show` to `true` to see dynamic chunks served by initial request
  // set `show` to `false` to test how asynchronously loaded chunks behave,
  // specifically: CHECK YOUR NETWORK TAB TO SEE 2 FILES (JS + CSS) RECEIVED
  state = {
    show: true
  }

  componentDidMount() {
    if (this.state.show) return

    setTimeout(() => {
      console.log('now showing <Example />')
      this.setState({ show: true })
    }, 1500)
  }

  render() {
    return (
      <div>
        <h1 className={styles.title}>Hello World!</h1>
        {this.state.show && <UniversalExample page='Example' />}
        {!this.state.show && 'Async Component Not Requested Yet'}
      </div>
    )
  }
}
