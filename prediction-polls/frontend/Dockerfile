# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
RUN apt-get update && apt-get install -y build-essential python3
# Install dependencies
COPY package*.json ./
RUN npm install
RUN npm rebuild bcrypt --build-from-source

COPY . .

# Expose the port your frontend runs on (e.g., 3000)
EXPOSE 3000

# Command to start your frontend app
CMD ["npm", "start"]