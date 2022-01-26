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

// TODO: route get /:hashId
// 1. 收 res.query 的 id，query mongo
// 如果有 query 到，跳去該頁面
// 如果沒有 query 到，index render 警告訊息(利用 flag，類似 restaurant list search bar 的方式)

app.listen(port, () => {
  console.log(`URLShortenr is running on http://localhost:${port}`)
})
