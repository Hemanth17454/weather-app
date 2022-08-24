
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast');
const path=require("path")
const hbs = require('hbs')
const request=require("request")

const PORT=process.env.PORT

const app = express()
app.use(express.json());

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')



app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))



app.get('', (req, res) => {
    res.render('index')
})


app.post('/weather', async (req, res) => {
     const data=req.body
    console.log(data.cities.length)
    if (!data.cities) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    //res.send({weather:{mumbai:"25c",delhi:"23c"}})
    k=[]
    weather={}
    for (let i=0 ;i<data.cities.length;i++){
        //Get the Forecast for each City
        const url = 'http://api.weatherstack.com/current?access_key='+process.env.API_KEY+'&query='+data.cities[i]
        console.log(url)
        await request({url, json: true }, (error, { body }) => {
        if (error) {
            k.push(i)  
            weather[data.cities[i]]=error
        } 
        else if (body.error) {
            k.push(i)
            weather[data.cities[i]]='Unable to find location'
        } 
        else {
            k.push(i)
            weather[data.cities[i]]=body.current.temperature+"c"
        }
        if (k.length===data.cities.length){
            res.send({weather})
        }
    })
    }

    
})
    
  
app.get('*', (req, res) => {
    res.status(404).send({error:"Url Not Found"})
})


app.listen(, () => {
    console.log('Server is up on port 3000.')
})