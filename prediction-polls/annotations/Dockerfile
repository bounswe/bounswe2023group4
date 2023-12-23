# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 4999

# Run your app
CMD ["node", "src/app.js"]