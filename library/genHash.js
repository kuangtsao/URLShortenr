// 定義 user 需要的東西
const lowerAlphabet = 'abcdefghijklmnopqrstuvwxyz'
const upperAlphabet = lowerAlphabet.toUpperCase()
const numbers = '1234567890'

const collection = [].concat(lowerAlphabet.split(''))
  .concat(upperAlphabet.split(''))
  .concat(numbers.split(''))

// 隨機由陣列取出一個值
function sample (arr) {
  const randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex]
}

function genHash () {
  // 產生密碼
  let hash = ''
  for (let i = 1; i <= 5; i++) {
    hash += sample(collection)
  }

  // 回傳密碼
  return hash
}

module.exports = genHash
