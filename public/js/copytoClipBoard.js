const button = document.querySelector('#copyBtn')

button.addEventListener('click', function () {
  const url = document.querySelector('#short-url').text
  navigator.clipboard.writeText(url)
    .then(() => alert('success'))
    .catch(() => alert('fail'))
})
