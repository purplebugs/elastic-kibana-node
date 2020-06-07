# elastic-kibana-node

Elasticsearch and Kibana v7.7.1, and a node.js app working together using Docker

## Purpose

Have a simple way to quickly install and run Elasticsearch, Kibana and node.js together

The larger goal is to automate getting data into Elasticsearch and showing on Kibana Dashboards for playing around with different datasets in a development environment

Work in progress...

Current status: The node.js app uses the Elasticsearch API to get info about the current cluster and indices and sends the response to http://0.0.0.0:8080

## Pre-Requisites

1. Install [docker](https://docs.docker.com/install/)
2. Install [docker-compose](https://docs.docker.com/compose/install/)
3. Clone this repo
4. Install [node.js](https://nodejs.org/)


## Steps to take

1. [Install the repo locally](#install-the-repo-locally)
2. [Build the node.js docker image](#build-the-nodejs-docker-image)
3. [Start the app](#start-the-app)
4. [Verify the app is running as expected](#verify-the-app-is-running-as-expected)
5. [Stop the app](#stop-the-app)
6. [Troubleshooting](#troubleshooting)

### Install the repo locally

```
npm install
```


### Build the node.js docker image

Note: Skip this step if you have already built this images in your environment previously

Navigate to the directory containing the Dockerfile

```
cd my_node_http_app
```

Build a versioned image of the node.js app

```
docker build -t purplebugs/my_node_http_app:1.1 .
```


Optional: Verify the image is created by looking for the app tagged with that version

```
docker images
```

The node.js app will not be running until the docker-compose command is run in the next step.


### Start the app

Spin up a containerised instance of Elasticsearch, Kibana and the node.js application

```
docker-compose up
```

### Verify the app is running as expected

Navigate to http://localhost:8080/

You might need to wait around 20 seconds for Elasticsearch and Kibana to be up and running.

The response should show the output of the node.js app.  Example response at the time of writing:

```
es01health status index uuid pri rep docs.count docs.deleted store.size pri.store.size green open .apm-custom-link K5QaClS7SDq5lXBUtRjaUA 1 1 0 0 416b 208b green open .kibana_task_manager_1 UQXPvUZQTCu0Kc4ChdtVBw 1 1 5 13 28.2kb 2.7kb green open .apm-agent-configuration H8cXd5CoTTqP8_Tv9YO2gA 1 1 0 0 416b 208b green open .kibana_1 XL3sZW0GRB6LMj4DQlIwHA 1 1 4 0 18.9kb 9.4kb
```

See the Troubleshooting section below if the app is not running as expected

Elasticsearch is available at http://localhost:9200/
Kibana is available at http://localhost:5601/ for working with the data and visualisations


### Stop the app

Stop the containerised instance of Elasticsearch, Kibana and the node.js application

```
docker-compose down
```

### Troubleshooting

#### Check the elasticsearch nodes are up and running

Submit a _cat/nodes request:

```
curl -X GET "localhost:9200/_cat/nodes?v&pretty"
```

#### Show Docker containers

List the names and states of containers

```
docker ps
```

#### Show Docker logs

Show the logs from a currently running container, eg to troubleshoot the Kibana container

```
docker logs kibana01
```

#### Stop the Docker container and persistent data

Useful if need to wipe all data and have a clean environment, eg due to old incompatible versions

Stop and delete the data volumes:

```
docker-compose down -v
```

#### List and remove the Docker images

This becomes useful if you have many older versions of the images lying about

List the images and their ids:
```
docker images
```

Remove the image by id. Example if the id is: 7ec4f35ab452
```
docker image rm 7ec4f35ab452
```


#### Troubleshooting the node app

Enter the container for troubleshooting

```
docker exec -it elastic-kibana-node_app_1 /bin/bash
```

Once inside the container, check the output of the app

```
curl localhost:8080
```

Exit the container

```
exit
```

## References

* [Install Elasticsearch with Docker](https://www.elastic.co/guide/en/elasticsearch/reference/7.7/docker.html)
* [Running Kibana on Docker](https://www.elastic.co/guide/en/kibana/current/docker.html)
* [Dockerizing a Node.js web app](https://nodejs.org/fr/docs/guides/nodejs-docker-webapp/)