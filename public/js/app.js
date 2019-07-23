// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input') //por elemento, agarra el primero
const messageOne = document.querySelector('#message-1') //por clase empieza por ".", por id es con #
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'Por favor ponga una ciudad'


weatherForm.addEventListener('submit', (e) => { // e = event
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''


    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) =>{
            if(data.error){
                messageOne.textContent = data.error

            } else {
           messageOne.textContent = data.location
           messageTwo.textContent = data.forecast 
            }
        })
    })


    console.log(location)
})