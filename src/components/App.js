import React from 'react'
import universal from 'react-universal-component'
import styles from '../css/App'
import CenterPiece from './CenterPiece'
import Loading from './Loading'
import { pages, nextIndex, indexFromPath } from '../utils'

const UniversalComponent = universal(props => import(`./${props.page}`), {
  minDelay: 1200,
  loading: Loading
})

export default class App extends React.Component {
  constructor(props) {
    super(props)

    const { history } = props
    const index = indexFromPath(history.location.pathname)

    this.state = {
      index,
      loading: false,
      done: false
    }

    history.listen(({ pathname }) => {
      const index = indexFromPath(pathname)
      this.setState({ index })
    })
  }

  changePage = () => {
    if (this.state.loading) return

    const index = nextIndex(this.state.index)
    const page = pages[index]

    this.props.history.push(`/${page}`)
    this.setState({ index })
  }

  beforeChange = ({ isSync, isServer, isMount }) => {
    if (!isSync) {
      this.setState({ loading: true })
    }
  }

  afterChange = ({ isSync, isServer, isMount }) => {
    if (!isSync) {
      this.setState({ loading: false })
    }
    else if (!isServer && !isMount) {
      this.setState({ done: true })
    }
  }

  render() {
    const { index, done, loading } = this.state
    const page = pages[index]
    const loadingClass = loading ? styles.loading : ''
    const buttonClass = `${styles[page]} ${loadingClass}`

    return (
      <div className={styles.container}>
        <h1>Hello Reactlandia</h1>
        {done && <div className={styles.checkmark}>all loaded ✔</div>}

        <CenterPiece page={page} />

        <UniversalComponent
          page={page}
          onBefore={this.beforeChange}
          onAfter={this.afterChange}
        />

        <button className={buttonClass} onClick={this.changePage}>
          {loading ? 'LOADING...' : 'CHANGE PAGE'}
        </button>

        <p>
          <span>*why are you looking at this? refresh the page</span>
          <span>and view the source in Chrome for the real goods</span>
        </p>
      </div>
    )
  }
}
