// express setting
const express = require('express')
const app = express()
const port = 3000

// express-handlebars setting
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// mongoose setting
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/url-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.once('error', () => {
  console.log('mongo error!')
})

db.once('open', () => {
  console.log('mongo is connected')
})

// routes
app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`URLShortenr is running on http://localhost:${port}`)
})
