# Practice App

## Docker Usage
- First use "docker-compose build" to create images
- Use created images with containers and bind their ports.
  * For backend use "docker run -d -p 8000:8000 practice-app-backend" to start localhost:8000: 
  * For frontend use "docker run -d -p 3000:3000 practice-app-frontend" to start localhost:3000:
- You can check the container status with "docker container ls"
