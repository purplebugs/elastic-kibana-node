# elastic-kibana-node

Proof of concept of elasticsearch kibana and a node.js app working together

Work in progress...

## Build the docker file
```
docker build -t purplebugs/node-web-app:1.0 .
```

## Run the docker image which is an instance of the app
```
docker run --rm -p 8090:8080 -d --name node-app purplebugs/node-web-app:1.0
```

## Check the app is running as expected

TO DO

## Delete the container running the app

Once happy with the app and no longer require it to be running, delete the container running the app

```
docker container rm --force node-app
```

## Troubleshooting the node app

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
