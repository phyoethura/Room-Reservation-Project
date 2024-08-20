# Use the official Node.js image from Docker Hub
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port (optional, depending on your setup)
EXPOSE 3000

# Run the application
CMD ["node", "proj.js"]