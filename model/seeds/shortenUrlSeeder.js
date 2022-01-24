const db = require('../../config/mongoose')
const ShortenUrl = require('../url')

db.once('open', () => {
  console.log('loading seeds for testing')

  ShortenUrl.create([
    {
      hash_id: '80port',
      url: 'http://example.com'
    }, 
    {
      hash_id: '443port',
      url: 'https://example.com'
    }
  ])
    .then(() => {
      console.log('all seeds is loaded.you may test redirect feature.')
    })
    .catch(err => console.log(err))
    .finally(() => process.exit())
})
