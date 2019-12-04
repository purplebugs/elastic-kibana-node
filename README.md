# elastic-kibana-node
Proof of concept of elasticsearch kibana and a node.js app working together

Work in progress...

## Build the docker file
```
docker build -t purplebugs/node-web-app .
```

## Run the docker image which is an instance of the app
```
docker run --rm -p 8090:8080 -d --name my_node_app purplebugs/node-web-app
```
