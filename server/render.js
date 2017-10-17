import React from 'react'
import ReactDOM from 'react-dom/server'
import createHistory from 'history/createMemoryHistory'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import App from '../src/components/App'

export default ({ clientStats }) => (req, res) => {
  const history = createHistory({ initialEntries: [req.path] })
  const stream = ReactDOM.renderToNodeStream(<App history={history} />)
  const chunkNames = flushChunkNames()

  const {
    js, styles, cssHash, scripts, stylesheets
  } = flushChunks(
    clientStats,
    { chunkNames }
  )

  console.log('PATH', req.path)
  console.log('DYNAMIC CHUNK NAMES RENDERED', chunkNames)
  console.log('SCRIPTS SERVED', scripts)
  console.log('STYLESHEETS SERVED', stylesheets)

  res.write(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>react-universal-component-boilerplate</title>
        ${styles}
      </head>
      <body>
        <div id="root">`)

  stream.pipe(res, { end: false })

  stream.on('end', () => {
    res.write(`</div>
          ${cssHash}
          ${js}
        </body>
      </html>
    `)

    res.end()
  })
}
