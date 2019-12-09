// Using modules from npm
const fetch = require("node-fetch");
const express = require("express");

// To run: node server.js

// Constants
PORT = 8080;
HOST = '0.0.0.0';

// App
const app = express();

// Create node web server
app.get('/', (req, res) => { 

// Use promise all construct to run requests synchronously
Promise.all([
    fetch("http://0.0.0.0:9200").then((fetchResponses) => {return fetchResponses.json()}), // To be able to access json object properties
    fetch("http://0.0.0.0:9200/_cat/indices?v").then((fetchResponses) => {return fetchResponses.text()})
]).then((bodies) => {
    res.send(
        bodies[0].name + // Able to access json object properties
        bodies[1]) // This is text
}).catch((error) => {res.send(error)})

});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
console.log('Navigate to http://0.0.0.0:8080/ to see info about the Elasticsearch cluster running');