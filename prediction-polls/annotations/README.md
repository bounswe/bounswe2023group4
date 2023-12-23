# Instructions

This document contains instructions to run the annotation server and its database. There will be two dockers, one for the server and one for the database. They need to communicate so we establish a docker network. Also, database data should be persistent so we use docker volume.

## Database
We use mongoDB for storing annotations in this project. In your server, you should have docker installed.

First, configure a docker network
```
docker network create annotation-network
```

Configure a volume
```
docker volume create annotation_data
```

Run the stock database image with a name, network, and volume
```
docker run --name anno-db --network=annotation-network --volume=annotation_data:/data/db -d mongo
```

## Server

We have an express app for our annotation server. The ports should be mapped, it should be on the same network as the database docker. You should be able to find an image for AMD64 sefik123/anno1:latest.

Pull the server image from docker
```
docker pull sefik123/anno1:latest
```

Run the server with port forwarding and in the same network that the database is in
```
docker run -d -p 4999:4999 --network=annotation-network sefik123/anno1:latest
```

## Building Server

If you can't access the docker image, you can build the image from the annotations folder.

Build the docker image for AWS EC2. So we specify platform.
```
docker build --platform=linux/amd64 -t anno1 .
```

Tag the build. Put you docker username instead of sefik123.
```
docker tag anno1:latest sefik123/anno1:latest 
```

Push the build.
```
docker push sefik123/anno1:latest
```
