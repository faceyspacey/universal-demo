import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import AppContainer from 'react-hot-loader/lib/AppContainer'
import App from './components/App'

const history = createHistory()
let messages = {}

const render = App =>
  ReactDOM.render(
    <AppContainer>
      <App history={history} messages={messages} />
    </AppContainer>,
    document.getElementById('root')
  )

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./components/App.js', () => {
    const App = require('./components/App').default
    render(App)
  })
}

import('./messages').then(incomingMessages => {
  messages = incomingMessages
  render(App)
})
