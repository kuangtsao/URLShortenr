const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 定義 schema
const shortenUrlSchema = new Schema({
  hash_id: {
    type: String
    required: true
  },
  url: {
    type: String
    required: true
  }
})

module.exports = mongoose.model('shorten_url', shortenUrlSchema)
