# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y build-essential python3
# Install dependencies
COPY package*.json ./
RUN npm install
RUN npm rebuild bcrypt --build-from-source
# Bundle app source
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run your app
CMD ["node", "src/app.js"]

