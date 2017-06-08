import path from 'path'
import React from 'react'
import ReactDOM from 'react-dom/server'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import App from '../src/components/App'

export default ({ clientStats, outputPath }) => (req, res, next) => {
  const app = ReactDOM.renderToString(<App />)
  const chunkNames = flushChunkNames()

  const {
    // react components:
    Js,
    Styles, // external stylesheets
    Css, // raw css

    // strings:
    js,
    styles, // external stylesheets
    css, // raw css

    // arrays of file names (not including publicPath):
    scripts,
    stylesheets,

    publicPath
  } = flushChunks(clientStats, {
    chunkNames,
    before: ['bootstrap'],
    after: ['main'],

    // only needed if serving css rather than an external stylesheet
    // note: during development css still serves as a stylesheet
    outputPath
  })

  console.log('PATH', req.path)
  console.log('SERVED SCRIPTS', scripts)
  console.log('SERVED STYLESHEETS', stylesheets)

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
        </body>
      </html>`
  )

  // COMMENT the above `res.send` call
  // and UNCOMMENT below to test rendering React components:

  // const html = ReactDOM.renderToStaticMarkup(
  //   <html>
  //     <head>
  //       <Css />
  //     </head>
  //     <body>
  //       <div id="root" dangerouslySetInnerHTML={{ __html: app }} />
  //       <Js />
  //     </body>
  //   </html>
  // )

  // res.send(`<!DOCTYPE html>${html}`)
}
