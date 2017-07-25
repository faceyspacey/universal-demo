import React from 'react'
import ReactDOM from 'react-dom/server'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import App from '../src/components/App'

export default ({ clientStats, outputPath }) => (req, res) => {
  const app = ReactDOM.renderToString(<App />)
  const chunkNames = flushChunkNames()

  const {
    js,
    styles,
    cssHash,
    scripts,
    stylesheets
  } = flushChunks(clientStats, { chunkNames })

  console.log('PATH', req.path)
  console.log('DYNAMIC CHUNK NAMES RENDERED', chunkNames)
  console.log('SCRIPTS SERVED', scripts)
  console.log('STYLESHEETS SERVED', stylesheets)
  console.log('STATS.ASSETS_BY_CHUNK_NAME', clientStats.assetsByChunkName)
  console.log('CSS HASH', cssHash.toString())

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
          ${cssHash}
          ${js}
        </body>
      </html>`
  )
}
