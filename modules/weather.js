
const axios = require('axios');
let cacheMemory = {};
// localhost:3007/weather?city=amman&key=/
function weatherRouteHandler(req, res) {
    // res.send('weather route')
    let cityNameData = req.query.city;
    console.log(req.query.city)
    let weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityNameData}&key=${process.env.WEATHER_API_KEY}`;
    console.log(weatherURL);
   
    if (cacheMemory[cityNameData] !== undefined) {
        console.log('the cache contain data ')
        console.log(cacheMemory);
        res.send(cacheMemory[cityNameData]);
    } else {
        console.log('cache memory is empty hit the api')
        
        try{
            axios.get(weatherURL).then(weatherDataResult => {
            console.log('inside sending request');
            
            let newArray = weatherDataResult.data.data.map(element => new Forecast(element));
            
            cacheMemory[cityNameData] = newArray;
            res.status(200).send(newArray);

        });
    }
 
        catch(error){
            console.log('error from axios', error);
            res.send(error);
    }
    }
}
    class Forecast {
        constructor(element) {
            this.date = element.datetime;
            this.description = `low Of ${element.low_temp},high of ${element.high_temp} with ` + element.weather.description;
        }
    }
    module.exports = weatherRouteHandler;