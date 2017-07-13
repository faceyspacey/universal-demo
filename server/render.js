import React from 'react'
import ReactDOM from 'react-dom/server'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import App from '../src/components/App'
import { StaticRouter } from 'react-router-dom'
export default ({ clientStats, outputPath }) => (req, res) => {
  const context = {}
  const result = (
    <StaticRouter context={context} location={req.url}>
      <App />
    </StaticRouter>
  )

  const app = ReactDOM.renderToString(result)
  const chunkNames = flushChunkNames()
  const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames })

  console.log('PATH', req.path)
  console.log('CHUNK NAMES RENDERED', chunkNames)

  res.send(
    `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>react-universal-component-boilerplate</title>
          ${styles}
        </head>
        <body>
          <div id="root">${app}</div>
          ${js}
          ${cssHash}
        </body>
      </html>`
  )
}
