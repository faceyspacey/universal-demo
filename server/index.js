require('module-alias/register')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
const clientConfig = require('../webpack/client.dev')
const serverConfig = require('../webpack/server.dev')
const clientConfigProd = require('../webpack/client.prod')
const serverConfigProd = require('../webpack/server.prod')

const DEV = process.env.NODE_ENV === 'development'
const publicPath = clientConfig.output.publicPath
const outputPath = clientConfig.output.path
const app = express()

const done = () =>
  app.listen(3000, () => {
    console.log(
      'BUILD COMPLETE -- Listening @ http://localhost:3000/ -- IGNORE THE "Chunk.modules is deprecated warning"; IT\'S FROM EXTRACT-CSS-CHUNKS-WEBPACK-PLUGIN'
    )
  })

if (DEV) {
  const compiler = webpack([clientConfig, serverConfig])
  const clientCompiler = compiler.compilers[0]

  app.use(webpackDevMiddleware(compiler, { publicPath }))
  app.use(webpackHotMiddleware(clientCompiler))
  app.use(
    // keeps serverRender updated with arg: { clientStats, outputPath }
    webpackHotServerMiddleware(compiler, {
      serverRendererOptions: { outputPath }
    })
  )

  compiler.plugin('done', done)
}
else {
  webpack([clientConfigProd, serverConfigProd]).run((err, stats) => {
    // const clientStats = require('../buildClient/stats.json')
    const clientStats = stats.toJson().children[0]
    console.log('CLIENT STATS', clientStats)
    const serverRender = require('../buildServer/main.js').default

    app.use(publicPath, express.static(outputPath))
    app.use(serverRender({ clientStats, outputPath }))

    done()
  })
}
