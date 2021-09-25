const axios = require('axios');
let cacheMemory = {};

function getMovieHandler(req,res){
    // res.send('movie route');
    let searchQuerey = req.query.query;
    let movieURL= `https://api.themoviedb.org/3/search/movie?query=${searchQuerey}&api_key=${process.env.API_MOVIE_KEY}`;
    console.log(movieURL);

    if (cacheMemory[searchQuerey] !== undefined) {
        console.log('the cache contain data ')
        console.log(cacheMemory);
        res.send(cacheMemory[searchQuerey]);
    } else {
        console.log('cache memory is empty hit the api')
    }
    axios.get(movieURL).then(dataResult =>{
        console.log('inside sending data');

        let newArrayMovie = dataResult.data.results.map(item=>{
            return new Movie(item);
        });
        cacheMemory[searchQuerey] = newArrayMovie;

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
        this.imgUrl = 'https://image.tmdb.org/t/p/w500'+ item.poster_path;
        this.popularity = item.popularity;
        this.released = item.release_date;
    }
}

module.exports = getMovieHandler;