// express setting
const express = require('express')
const app = express()
const port = 3000

// express-handlebars setting
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// express-vaildator setting
const { body, validationResult } = require('express-validator')

// import body parser
app.use(express.urlencoded({ extended: true }))

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

const genHash = require('./library/genHash')

app.post('/',
  body('url').isURL().withMessage('輸入的不是可用的 URL！'),
  (req, res) => {
    const hashValue = genHash()
    const inputUrl = req.body.url
    // 以後端方式檢查輸入值
    const urlError = validationResult(req)
    if (!urlError.isEmpty()) {
      const errorMessage = urlError.array().map(item => Object.values(item)[1]).toString()
      return res.status(400).render('index', { existence: true, urlErrorStatus: true, errorMessage })
    }

    // 新增資訊到 Mongo 資料庫
    Shorturl.create(
      {
        hash_id: hashValue,
        url: inputUrl
      }
    )
      .then(() => {
        console.log(`新增項目:\n hash_id: ${hashValue} \n url: ${inputUrl}`)
        console.log('成功新增，轉移到result 頁面')
        res.render('result', { hashValue })
      })
      .catch(error => {
        console.error(error)
        res.render('error', { error })
      })
  })

// 帶入 hash 值的轉址功能

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
    .catch(error => {
      console.error(error)
      res.render('error', { error })
    })
})

app.listen(port, () => {
  console.log(`URLShortenr is running on http://localhost:${port}`)
})
