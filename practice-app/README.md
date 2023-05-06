# Practice App

## Docker Usage
* First use "docker-compose build" to create images
* Use created images with containers and bind their ports.

For backend use to start localhost:8000: 
> docker run -d -p 8000:8000 practice-app-backend

For frontend use to start localhost:3000:
> docker run -d -p 3000:3000 practice-app-frontend

You can check the container status with:
> docker container ls