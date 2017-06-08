import React from 'react'
import universal from 'react-universal-component'
import styles from '../css/App.css'

const UniversalExample = universal(() => import(/* webpackChunkName: 'Chunk1' */ './Example'), {
  resolve: () => require.resolveWeak('./Example'),
  chunkName: 'Chunk1',
  minDelay: 500
})

export default class App extends React.Component {
  // set `show` to `true` to see dynamic chunks served by initial request
  // set `show` to `false` to test how asynchronously loaded chunks behave,
  // specifically how css injection is embedded in chunks + corresponding HMR
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
        <h1 className={styles.title}>Hello World</h1>
        {this.state.show && <UniversalExample />}
        {!this.state.show && 'Async Component Not Requested Yet'}
      </div>
    )
  }
}

