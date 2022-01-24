const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/url-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.once('error', () => {
  console.log('mongo error!')
})

db.once('open', () => {
  console.log('mongo is connected')
})

module.exports = db
