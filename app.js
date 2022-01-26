// express setting
const express = require('express')
const app = express()
const port = 3000

// express-handlebars setting
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting local static file
app.use(express.static('public'))

// db config
const Shorturl = require('./model/url')

// connect db
require('./config/mongoose')

// routes
app.get('/', (req, res) => {
  res.render('index', { existence: true })
})

const genHash = require('./genHash')

app.post('/', (req, res) => {
  // TODO: route post / 
  // 1. 收 body 的 url，query mongo
  // 如果有直接跳到 result
  // 2. query mongo，是否有同樣的的 hashValue，如果沒有則往下做
  // 有的話，重新產生一次
  const hashValue = genHash()
  console.log(`hashvalue: ${hashValue}`)
  res.render('result', { hashValue })
})

app.get('/:hash', (req, res) => {
  const hashValue = req.params.hash
  Shorturl.findOne({ hash_id: hashValue })
    .lean()
    .then(result => {
      if (result !== null) {
        res.redirect(result.url)
      } else {
        res.render('index', { existence: false })
      }
    })
    .catch(error => console.error(error))
})

app.listen(port, () => {
  console.log(`URLShortenr is running on http://localhost:${port}`)
})
