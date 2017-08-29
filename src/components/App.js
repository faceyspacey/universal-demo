import React from 'react'
import universal from 'react-universal-component'
import styles from '../css/App'
import UsageHero from './UsageHero'
import Loading from './Loading'
import NotFound from './NotFound'
import { examples, nextIndex, indexFromPath } from '../utils'
import createStore from '../createVuexStore'

const UniversalComponent = universal(
  props => import(`./examples/${props.example}`),
  {
    minDelay: 1200,
    loading: Loading,
    error: NotFound
  }
)

export default class App extends React.Component {
  render() {
    const { index, done, loading } = this.state
    const example = examples[index]
    const loadingClass = loading ? styles.loading : ''
    const buttonClass = `${styles[example]} ${loadingClass}`

    return (
      <div className={styles.container}>
        <h1>Hello Reactlandia</h1>
        {done && <div className={styles.checkmark}>all loaded ✔</div>}

        <UsageHero example={example} />

        <UniversalComponent
          example={example}
          onBefore={this.beforeChange}
          onAfter={this.afterChange}
          onError={this.handleError}
        />

        <button className={buttonClass} onClick={this.changePage}>
          {this.buttonText()}
        </button>

        <p>*view the source in Chrome to verify universal code-splitting</p>

        {example === 'Vuex' &&
          <div className={styles.fromReact}>
            <div>
              vuex state in react: {this.count()}
            </div>
            <button onClick={this.divide}>DIVIDE BY 2 FROM REACT</button>
          </div>}
      </div>
    )
  }

  // Vuex in React!

  divide = () => {
    this.vuexStore.dispatch('divide', 2)
  }
  count() {
    return this.vuexStore ? this.vuexStore.state.count : 0
  }
  componentDidMount() {
    this.vuexStore = createStore()
    this.vuexStore.subscribe(() => this.forceUpdate())
  }

  // standard stuff

  constructor(props) {
    super(props)

    const { history } = props
    const index = indexFromPath(history.location.pathname)

    this.state = {
      index,
      loading: false,
      done: false,
      error: false
    }

    history.listen(({ pathname }) => {
      const index = indexFromPath(pathname)
      this.setState({ index })
    })
  }

  changePage = () => {
    if (this.state.loading) return

    const index = nextIndex(this.state.index)
    const example = examples[index]

    this.props.history.push(`/${example}`)
  }

  beforeChange = ({ isSync }) => {
    if (!isSync) {
      this.setState({ loading: true, error: false })
    }
  }

  afterChange = ({ isSync, isServer, isMount }) => {
    if (!isSync) {
      this.setState({ loading: false, error: false })
    }
    else if (!isServer && !isMount) {
      this.setState({ done: true, error: false })
    }
  }

  handleError = error => {
    this.setState({ error: true, loading: false })
  }

  buttonText() {
    const { loading, error } = this.state
    if (error) return 'ERROR'
    return loading ? 'LOADING...' : 'NEXT EXAMPLE'
  }
}
