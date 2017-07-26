import React from 'react'
import universal from 'react-universal-component'
import styles from '../css/App.css'

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
        <h1 className={styles.title}>Hello World</h1>
        {this.state.show && <UniversalComponent page='Foo' />}
        {!this.state.show && 'Async Component Not Requested Yet'}
      </div>
    )
  }
}

const UniversalComponent = universal(props => import(`./${props.page}`), {
  minDelay: 500
})
