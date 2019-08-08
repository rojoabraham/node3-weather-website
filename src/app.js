const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs') //busca el folder "views"
app.set ('views', viewsPath) //en vez de buscar "views" busca viewsPath
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('', {
        title: 'App de clima',
        name: 'Abraham Rojo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Abraham Rojo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Ayudaaaa!',
        message: 'No te puedo ayudar',
        name: 'Abraham Rojo'
    })
})

// app.get('', (req, res) =>{
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{


//         name: 'Abraham',
//         age: 32
//     },{
//     name: 'Joahnna',
//     age: 31
// }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h2>Holinguis</h2>')
// })

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Debes poner una direccion'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
           return res.send({error})
        }
               
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address 

            })
        })
    })

})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'Debes poner una busqueda'
        })
    }
    
    console.log(req.query.pollo)
    res.send({
        products: []
    })
})

app.get('/thanos', (req, res) => {
    res.render('thanos',{
        message: 'Sobreviviste a Thanos? Averigualo',
        title: 'Sobreviviste a Thanos?',
        name: "Lucas y Abraham"
    } )
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Artículo de ayuda no encontrado',
        title: '404 de ayuda',
        name: 'Abraham Rojo'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Andas perdido mijo?',
        title: '404',
        name: 'Abraham Rojo'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})