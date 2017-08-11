import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import AppContainer from 'react-hot-loader/lib/AppContainer'
import App from './components/App'
import loadMessages from './loadMessages'

const history = createHistory()
const LANG = 'en'
const messages = {}

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

  module.hot.accept('./loadMessages', () => {
    const loadMessages = require('./loadMessages').default
    loadMessages(LANG).then(incoming => {
      Object.assign(messages, incoming)
      render(App)
    })
  })
}

loadMessages(LANG).then(incoming => {
  Object.assign(messages, incoming)
  render(App)
})
