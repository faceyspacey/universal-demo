import React from 'react'
import universal from 'react-universal-component'
import styles from '../css/App.css'
import { Route, Link } from 'react-router-dom'

const UniversalExample = universal(() => import('./Example'), {
  resolve: () => require.resolveWeak('./Example'),
  chunkName: 'Example', // babel-plugin-dual-import automatically sets chunkName based on path
  minDelay: 500
})

const UniversalAsync = universal(() => import('./Async'), {
  resolve: () => require.resolveWeak('./Async'),
  chunkName: 'Async', // babel-plugin-dual-import automatically sets chunkName based on path
  minDelay: 500
})

export default class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          <ul>
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/async'}>Async Route</Link></li>
          </ul>
          <Route exact path={'/async'} component={UniversalAsync} />
          <Route exact path={'/'} component={UniversalExample} />
        </div>
      </div>
    )
  }
}
