import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import { AppContainer } from 'react-hot-loader'
import App from './components/App'

const history = createHistory()

const render = AppRoot => ReactDOM.render(
  <AppRoot history={history} />,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const App = require('./components/App').default
    render(App)
  })
}

render(App)
