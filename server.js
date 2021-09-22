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
server.get('/getMovie', getMovieHandler);
server.get('*', notFoundHandler);


function homeRouteHandler(req, res) {
    res.send('home Route');
}

// localhost:3007/weather?city=amman&key=/
function weatherRouteHandler(req, res){
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
function getMovieHandler(req,res){
    // res.send('movie route');
    let searchQuerey = req.query.query;
    let movieURL= `https://api.themoviedb.org/3/search/movie?query=${searchQuerey}&api_key=${process.env.API_MOVIE_KEY}`;
    console.log(movieURL);

    axios.get(movieURL).then(dataResult =>{
        console.log('inside sending data');

        let newArrayMovie = dataResult.data.results.map(item=>{
            return new Movie(item);
        })
        console.log(newArrayMovie);
        res.send(newArrayMovie);
    }).catch(error =>{
        res.send(error);
    });
}

function notFoundHandler(req, res) {
    res.status(404).send('404 Route is not found')
}

class Forecast {
    constructor(element) {
        this.date = element.datetime;
        this.description = `low Of ${element.low_temp},high of ${element.high_temp} with `+element.weather.description;
    }
}
class Movie{
    constructor(item){
        this.title = item.title;
        this.overview = item.overview;
        this.avgvotes = item.vote_average;
        this.votecount = item.vote_count;
        this.imgUrl = item.poster_path;
        this.popularity = item.popularity;
        this.released = item.release_date;
    }
}

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})