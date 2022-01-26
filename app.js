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
  // 1. 檢查前端輸入值與 url
  // 收 req.body.url 
  // 如果前端輸入值不為 url 跳回首頁報錯
  // query req.body.url，如果 url 重複 跳回首頁報錯(null 通過，其他不通過)
  // 2. query mongo，是否有同樣的的 hashValue，如果沒有則往下做
  // 有的話，重新產生一次，並取代原有的 hashValue(null 通過，其他重新產生後往下做)
  // 3. 以上檢查完畢後，將所有資料 create 進 mongo，render result 頁面
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
