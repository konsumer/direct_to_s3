import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import cors from 'cors'
import s3router from 'react-s3-uploader/s3router'

import config from '../webpack.config.babel.js'

if (!process.env.DIRECT_TO_S3_BUCKET) {
  console.error('Please setup DIRECT_TO_S3_BUCKET (see README.)')
  process.exit(1)
}

const app = express()
const compiler = webpack(config)
const port = process.env.PORT || 3000

app.use(cors())

app.use(webpackDevMiddleware(compiler, config.devServer))
app.use(webpackHotMiddleware(compiler))

app.use(express.static(`${__dirname}/../webroot`))

app.use('/s3', s3router({
  bucket: process.env.DIRECT_TO_S3_BUCKET
}))

app.listen(port, () => console.log(`listening on http://0.0.0.0:${port}`))
