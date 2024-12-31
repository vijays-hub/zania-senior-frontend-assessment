FROM node:18-alpine

# Create and set the working directory in the docker container to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY package*.json ./

# Install dependencies in the container
# The --legacy-peer-deps flag is used to avoid the "npm ERR! code ERESOLVE" error for peer dependencies
RUN npm install --legacy-peer-deps

# Copy everything else from our project to the container (including /src/ and /public/, etc.)
# into the container at /app
COPY . .

# TODO: If the app has to be shipped to production, we can run the build command here

# Expose the port the app runs on
EXPOSE 3000

# Serve the app
CMD ["npm", "start"]
