// express setting
const express = require('express')
const app = express()
const port = 3000

// express-handlebars setting
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// routes
app.get('/', (req, res) => {
  res.render('index')
})

const genHash = require('./genHash')

app.post('/', (req, res) => {
  const hashValue = genHash()
  console.log(`hashvalue: ${hashValue}`)
  res.render('result', { hashValue })
})

app.listen(port, () => {
  console.log(`URLShortenr is running on http://localhost:${port}`)
})
