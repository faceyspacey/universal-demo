import React from 'react'
import universal from 'react-universal-component'
import styles from '../css/App.css'

export default class App extends React.Component {
  state = {
    page: 'Example'
  }

  changePage = () => {
    console.log('CHANGE PAGE', this.state.page)
    this.setState(({ page }) => ({
      page: page === 'Foo' ? 'Example' : 'Foo'
    }))
  }

  render() {
    const { page } = this.state

    return (
      <div>
        <h1 className={styles.title}>Hello Reactlandia</h1>

        <button onClick={this.changePage}>CHANGE PAGE</button>

        <UniversalComponent page={page} />
      </div>
    )
  }
}

const UniversalComponent = universal(props => import(`./${props.page}`), {
  minDelay: 1000
})
