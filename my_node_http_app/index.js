const fetch = require("node-fetch"); // Using module from npm

// To run: node index.js
console.log('Hello World!');

// Using npm module which is simpler to use
fetch("http://localhost:9200")
    .then((res) => {
       return res.text()
    })
    .then((body) => {
        console.log(body)
    }).catch((error) => {
        console.log(error);
    });

setInterval(() => {
    // Keep process alive, ping every 5 seconds
    //console.log("hello")
},5000)