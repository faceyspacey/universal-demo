import React from 'react'
import styles from '../css/App'
import UsageHero from './UsageHero'
import { pages, nextIndex, indexFromPath } from '../utils'
import UniversalComponent from '../UniversalComponent'

const UniversalParagraph = universal(
  import('./group.js').then(({ Paragraph }) => Paragraph)
)
const UniversalBold = universal(import('./group.js').then(({ Bold }) => Bold))

export default class App extends React.Component {
  render() {
    const { index, done, loading } = this.state
    const page = pages[index]
    const loadingClass = loading ? styles.loading : ''
    const buttonClass = `${styles[page]} ${loadingClass}`

    return (
      <div className={styles.container}>
        <h1>
Hello Reactlandia
        </h1>
        {done && (
        <div className={styles.checkmark}>
all loaded ✔
        </div>
        )}

        <UsageHero page={page} />

        <UniversalComponent
          page={`components/${page}`}
          onBefore={this.beforeChange}
          onAfter={this.afterChange}
          onError={this.handleError}
        />

        <button type='button' className={buttonClass} onClick={this.changePage}>
          {this.buttonText()}
        </button>

        <UniversalParagraph>
          <UniversalBold>This is Bold Text</UniversalBold>
          and some not bold text
        </UniversalParagraph>

        <p>
          <span>
*why are you looking at this? refresh the page
          </span>
          <span>
and view the source in Chrome for the real goods
          </span>
        </p>
      </div>
    )
  }

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
    const { loading, index } = this.state
    const { history } = this.props
    if (loading) return

    const idx = nextIndex(index)
    const page = pages[idx]

    history.push(`/${page}`)
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
    return loading ? 'LOADING...' : 'CHANGE PAGE'
  }
}
