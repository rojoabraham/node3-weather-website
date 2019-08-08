// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input') //por elemento, agarra el primero
const messageOne = document.querySelector('#message-1') //por clase empieza por ".", por id es con #
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'Por favor pon tu nombre para buscarte'


weatherForm.addEventListener('submit', (e) => { // e = event
    e.preventDefault()
    const nombre = search.value

    messageOne.textContent = 'Buscando a ' + nombre
    messageTwo.textContent = ''


    const num = Math.random() * 2

    if(num>=1){
        messageOne.textContent =  nombre + '!! Muy bien, sobreviviste!'
    } else {
        messageOne.textContent = 'Lo siento, ' + nombre + ". Qué tonto, no sobreviviste =("
    }




    console.log(location)
})