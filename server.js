'use strict';

// to use the required libraries same as importing
const express = require('express');
require('dotenv').config();
const axios = require('axios');
const cors = require('cors');
const server = express();
const PORT = process.env.PORT;
server.use(cors());


server.get('/', homeRouteHandler);
server.get('/weather', weatherRouteHandler);
server.get('*', notFoundHandler);


function homeRouteHandler(req, res) {
    res.send('home Route');
}

// localhost:3007/weather?city=amman&key=*
function weatherRouteHandler(req, res){
    // res.send('weather route')
    let cityNameData = req.query.city;
    console.log(req.query.city)
    let weatherURL = `https://city-explorer-class07.herokuapp.com/weather?city=${cityNameData}`;
    console.log(weatherURL);
    

    axios.get(weatherURL).then(weatherDataResult => {
        console.log('inside sending request');
        let newArray = weatherDataResult.data.data.map(element => {
            return new Forecast(element);
        });
        res.send(newArray);
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
        this.description = `low Of ${element.low_temp},high of ${element.high_temp} with `+element.weather.description;
    }
}

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})