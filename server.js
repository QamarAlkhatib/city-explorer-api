'use strict';

// to use the required libraries same as importing
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const server = express();
const weatherData = require('./data/weather.json');
const PORT = process.env.PORT;
server.use(cors());



class Forecast {
    constructor(date, des, highTemp, lowTemp, cityname) {
        this.date = date;
        this.desc = des;
        this.highTemp = highTemp;
        this.lowTemp = lowTemp;
        this.cityname = cityname
    }
}

// localhost:3007/weather?cityname=Seattle&timezone=America/Los_Angeles&description=Light rain&date=2021-03-25
// localhost:3007/weather?cityname=Seattle&timezone=America/Los_Angeles

server.get('/Weather', (req, res) => {

    let cityNameData = req.query.cityname;
    console.log(req.query);
    console.log(req.query.cityname);



    let weatherInfo = weatherData.find((item) => {

        if (item.city_name === cityNameData) {
            return item;
        }

    });
    let newArray = weatherInfo.data.map(element => {
        return new Forecast(element.datetime, element.weather.description, element.high_temp, element.low_temp, element.city_name);
    });
    console.log(newArray);
    console.log('weather Info', weatherInfo);
    res.send(newArray);
});



server.get('*', (req, res) => {
    res.status(404).send('Route is not found')
})

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})
