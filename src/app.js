const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)



// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Cagatay Cinkir'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Cagatay Cinkir'
    })
})

app.get('/help',(req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Cagatay Cinkir'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "You must provide and adress"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error:error})
        } else {
            forecast(latitude, longitude, (error, forecast) => {
                if(error) {
                    return res.send(error)
                }
                res.send({
                    forecast,
                    location,
                    adress: req.query.address
                })
            })
        }
    })
})

app.get('/help/*',(req, res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'Help article not found!',
        name: 'Cagatay Cinkir'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Cagatay Cinkir'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})