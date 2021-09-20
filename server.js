'use strict';

// to use the required libraries same as importing
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const server = express();
const weatherData = require('./data/weather.json');
const PORT = process.env.PORT;
server.use(cors());





// localhost:3007/weather?cityname=Seattle&timezone=America/Los_Angeles&description=Light rain&date=2021-03-25
// localhost:3007/weather?cityname=Seattle&timezone=America/Los_Angeles

server.get('/Weather', (req, res) => {

    let cityNameData = req.query.cityname;
    console.log(req.query);
    console.log(req.query.cityname);

    let timeZoneData = req.query.timezone;
    console.log(req.query);
    console.log(req.query.timezone);

    // let descriptionData = req.query.description;
    // console.log(req.query);
    // console.log(req.query.description);
    
    // let dateData = req.query.date;
    // console.log(req.query);
    // console.log(req.query.date);

    let weatherInfo = weatherData.find((item) => {
        // if (item.city_name === cityNameData && item.timezone === timeZoneData && item.description === descriptionData && item.valid_date === dateData) 
        if (item.city_name === cityNameData && item.timezone === timeZoneData ) {
            
            return item;
        }

    });
    console.log('weather Info', weatherInfo);
    res.send(weatherInfo);
});


server.get('*', (req, res) => {
    res.status(404).send('Route is not found')
})

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})
