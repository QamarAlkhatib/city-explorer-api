'use strict';

const axios = require('axios');

// localhost:3007/weather?city=amman&key=/
function weatherRouteHandler(req, res) {
    // res.send('weather route')
    let cityNameData = req.query.city;
    console.log(req.query.city)
    let weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityNameData}&key=${process.env.WEATHER_API_KEY}`;
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
class Forecast {
    constructor(element) {
        this.date = element.datetime;
        this.description = `low Of ${element.low_temp},high of ${element.high_temp} with ` + element.weather.description;
    }
}

module.exports = weatherRouteHandler;
