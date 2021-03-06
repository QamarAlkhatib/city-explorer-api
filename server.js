'use strict';

// to use the required libraries same as importing
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const server = express();

const PORT = process.env.PORT;
server.use(cors());

const weatherRouteHandler = require(`./modules/weather.js`)
const getMovieHandler = require(`./modules/movies.js`)

server.get('/', homeRouteHandler);
server.get('/weather', weatherRouteHandler);
server.get('/getMovie', getMovieHandler);
server.get('*', notFoundHandler);

function homeRouteHandler(req, res) {
    res.send('home Route');
}

function notFoundHandler(req, res) {
    res.status(404).send('404 Route is not found')
}

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})