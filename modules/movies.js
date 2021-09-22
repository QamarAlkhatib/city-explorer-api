'use strict';

const axios = require('axios');

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

module.exports = getMovieHandler;