'use strict';

// to use the required libraries same as importing
const express = require('express');
require('dotenv').config();
const axios = require('axios');
const cors = require('cors');
const server = express();
const weatherData = require('./data/weather.json');
const PORT = process.env.PORT;
server.use(cors());


server.get('/', homeRouteHandler);
server.get('/weather', weatherRouteHandler);
server.get('*', notFoundHandler);


function homeRouteHandler(req, res) {
    res.send('home Route');
}

// localhost:3007/weather?city=amman&key=2838128258f14da4a8b2d5064dd19e7c
function weatherRouteHandler(req, res){
    // res.send('weather route')
    let cityNameData = req.query.city;
    let weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityNameData}&key=${process.env.WEATHER_API_KEY}`;
    console.log(weatherURL);
    

    axios.get(weatherURL).then(weatherDataResult => {
        console.log('inside sending request');
        let newArray = weatherDataResult.data.map(element => {
            res.send(newArray);
            return new Forecast(element);
        });
        console.log(newArray);
    }).catch(error => {
        console.log("error in sending the data ", error)
    });

}

function notFoundHandler(req, res) {
    res.status(404).send('Route is not found')
}

class Forecast {
    constructor(element) {
        this.date = element.datetime;
        this.description = element.weather.description;
    }
}

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})