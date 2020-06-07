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
    fetch("http://es01:9200").then((fetchResponses) => {return fetchResponses.json()}), // To be able to access json object properties,
    fetch("http://es01:9200/_cat/nodes?v&pretty").then(fetchResponses => {return fetchResponses.text()}),
    fetch("http://es01:9200/_cat/indices?v").then((fetchResponses) => {return fetchResponses.text()})
]).then((bodies) => {
    res.send(
        "[ Elasticsearch node ] " + 
        bodies[0].cluster_name + // Able to access json object properties
        "[ Elasticsearch cluster_name ] " +
        bodies[0].cluster_name +
        "[ Response from http://es01:9200/_cat/nodes?v&pretty ] " +
        bodies[1] + // This is text
        "[ Response from http://es01:9200/_cat/indices?v ] " +
        bodies[2])
}).catch((error) => {res.send(error)})
});

app.listen(PORT, HOST); 

// Note: This output is only useful if not running inside a docker container, since this console is not seen from outside the container
console.log(`Running on http://${HOST}:${PORT}`);
console.log('Navigate to http://0.0.0.0:8080/ to see info about the Elasticsearch cluster running');

/*
# Test elasticsearch is running
➜  my_node_http_app git:(master) ✗ curl -X GET "localhost:9200/_cat/nodes?v&pretty"
ip         heap.percent ram.percent cpu load_1m load_5m load_15m node.role master name
172.28.0.5           25          93   2    0.14    0.95     0.68 dilmrt    -      es02
172.28.0.3           24          93   2    0.14    0.95     0.68 dilmrt    *      es03
172.28.0.6           52          93   2    0.14    0.95     0.68 dilmrt    -      es01

# Show indices
➜  my_node_http_app git:(master) ✗ curl -X GET "localhost:9200/_cat/indices?v"
health status index                    uuid                   pri rep docs.count docs.deleted store.size pri.store.size
green  open   .apm-custom-link         JlPm2tUtTlS1LEr4aP5KPw   1   1          0            0       416b           208b
green  open   .kibana_task_manager_1   e7IAunyvRp62HZmzOyJ1IQ   1   1          5           13    104.3kb         71.8kb
green  open   .apm-agent-configuration 9PCfghP0TXirZRsllSa3Kg   1   1          0            0       416b           208b
green  open   .kibana_1                ZEc165ueRvyP3jjjdQtNwQ   1   1          9            0     89.4kb           43kb

*/