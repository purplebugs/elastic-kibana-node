# elastic-kibana-node

Elasticsearch, Kibana and a node.js app working together using Docker


## Purpose

Have a simple way to quickly install and run Elasticsearch, Kibana and node.js together

The larger goal is to automate getting data into Elasticsearch, and get the data showing on Kibana Dashboards as quickly and painlessly as possible

Work in progress...

Current status: The node.js app uses the Elasticsearch API to get info about the current cluster and indices and sends the response to http://0.0.0.0:8080


## Pre-Requisites

1. Install [docker](https://docs.docker.com/install/)
2. Install [docker-compose](https://docs.docker.com/compose/install/)
3. Clone this repo


## Steps to take

1. Build the node.js docker image
2. Run docker-compose
3. Verify the app is running as expected
4. Optional: Become familiar with useful Docker commands


## Build the node.js docker image

Build a versioned image of the node.js app

```
docker build -t purplebugs/my_node_http_app:1.1 .
```


Optional: Verify the image is created by looking for the app tagged with that version

```
docker images
```

The node.js app will not be running until the docker-compose command is run in the next step.


## Run docker-compose

Spin up a containerised instance of Elasticsearch, Kibana and the node.js application

```
docker-compose up
```


## Verify the app is running as expected

Navigate to http://localhost:8080/

You might need to wait around 20 seconds for Elasticsearch and Kibana to be up and running.


The response should show the output of the node.js app.  Example response at the time of writing:

```
es01health status index uuid pri rep docs.count docs.deleted store.size pri.store.size green open .kibana_task_manager_1 On0cPrf4QB6irSdX7oEHjw 1 0 2 1 43.4kb 43.4kb green open .apm-agent-configuration QZzgMQroTZusSdMpSjRpzA 1 0 0 0 283b 283b green open .kibana_1 g1gGkgX9Qh-2UGyFfewlhg 1 0 4 0 16.6kb 16.6kb
```

Get familiar with the commands below for troubleshooting if the output is not as expected.



## Optional: Become familiar with useful Docker commands


### List the Docker containers

This will show a clean overview of containers and their states

```docker-compose ps```


### List the Docker containers and images

This will show more info such as how long the containers have been running

```
docker ps
```


### Stop the Docker container

Stop the containerised instance of Elasticsearch, Kibana and the node.js application

```
docker-compose down
```


To stop and delete the data volumes:

```
docker-compose down -v
```

### Run the docker image which is an instance of the app

TODO: remove this? since not relevant in the context of docker-compose
```
docker run --rm -p 8090:8080 -d --name node-app purplebugs/my_node_http_app:1.0
```


### Delete the container running the app

TODO: remove this? since not relevant in the context of docker-compose

Once happy with the app and no longer require it to be running, delete the container running the app

```
docker container rm --force node-app
```


### Troubleshooting the node app

Enter the container for troubleshooting

```
docker exec -it node-app /bin/bash
```

Once inside the container, check the output of the app

```
curl localhost:8080
```

Exit the container

```
exit
```
