# Use a Node base image
FROM node:18-alpine

# Set working directory (no quotes)
WORKDIR /app

# Copy package files
COPY package*.json /app/

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . /app/

# Expose port
EXPOSE 4000

# Start the app
CMD ["npm", "start"]
