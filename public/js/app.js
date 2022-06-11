const weatherForm = document.querySelector('.search-form')
const search = document.querySelector('.search-input')
const messageOne = document.querySelector('.message-1')
const messageTwo = document.querySelector('.message-2')
const messageThree = document.querySelector('.message-3')
const messageFour = document.querySelector('.message-4')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  messageOne.textContent = 'Loading...'
  messageOne.classList.remove('error')

  messageTwo.textContent = ''
  messageThree.textContent = ''
  messageFour.textContent = ''

  fetch(`/weather?address=${search.value}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
        messageOne.classList.add('error')
      } else {
        messageOne.innerHTML = data.location
        messageTwo.innerHTML = `${data.forecast.description}.`
        messageThree.innerHTML = `Currently: ${data.forecast.temperature} ℃.`
        messageFour.innerHTML = `Feels like: ${data.forecast.feelsLike} ℃.`
      }
    })
})