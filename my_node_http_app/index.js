var http = require("http"); // Using built-in http node library
const fetch = require('node-fetch'); // Using module from npm

// To run: node index.js
console.log('Hello World!');

// Using built-in http node library, however it is a bit low level for my needs

http.get("http://localhost:9200", (response) => {
    console.log(response.statusCode);
});

// Using npm module which is simpler to use
fetch("http://localhost:9200")
    .then((res) => {
       return res.text()
    })
    .then((body) => {
        console.log(body)
    });