import React from 'react'
import universal from 'react-universal-component'
import importCss from 'babel-plugin-universal-import/importCss'
import universalImport from 'babel-plugin-universal-import/universalImport'
import styles from '../css/App.css'

// 1. using require.resolveWeak
const asyncWork = () =>
  universalImport({
    chunkName: ({ page }) => page,
    resolve: ({ page }) => require.resolveWeak(`./${page}`),
    load: ({ page }) =>
      Promise.all([
        import(/* webpackChunkName: '[request]' */ `./${page}`),
        importCss(page)
      ]).then(proms => proms[0])
  })

// 2. using require.context
// NOTE: triggers a warning, not sure if you want to keep the warning??
// const asyncWork = () => universalImport({
//   chunkName: ({ page }) => page,
//   resolve: ({ page }) => require.context('./', true, /^\.\/.*$/, 'weak').resolve(`./${page}`),
//   load: ({ page }) => Promise.all([
//     import(/* webpackChunkName: '[request]' */ `./${page}`),
//     importCss(page)
//   ]).then(proms => proms[0])
// })

// 3. using eager-weak
// const asyncWork = () => universalImport({
//   chunkName: 'Foo', // triggers chunk being served
//   // but we don't provide resolve to prevent load from being called
//   load: () => Promise.all([
//     import(/* webpackChunkName: 'Foo', webpackMode: 'eager-weak' */ './Foo'),
//     importCss('Foo')
//   ]).then(proms => proms[0])
// })

// 4. using eager-weak (with context)
// const asyncWork = () => universalImport({
//   chunkName: ({ page }) => page, // triggers chunk being served
//   // but we don't provide resolve to prevent load from being called
//   load: ({ page }) => Promise.all([
//     import(/* webpackChunkName: '[request]', webpackMode: 'eager-weak' */ `./${page}`),
//     importCss(page)
//   ]).then(proms => proms[0])
// })

// 5. add "plugins": ["universal-import"] to .babelrc and use just this :)
// const asyncWork = ({ page }) => import(`./${page}`)

const UniversalComponent = universal(asyncWork, { minDelay: 500 })

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
