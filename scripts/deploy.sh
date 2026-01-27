#!/bin/bash
set -e

EC2_IP="3.108.2.120"  # replace with your EC2 public IP

echo "Stopping existing containers..."
docker stop frontend_c || true
docker rm frontend_c || true
docker stop backend_c || true
docker rm backend_c || true
docker stop mongo_c || true
docker rm mongo_c || true

echo "Deploying MongoDB container..."
docker run -d -p 27017:27017 --name mongo_c mongo:6.0

echo "Deploying backend container..."
docker run -d -p 4000:4000 --name backend_c \
  --link mongo_c:mongodb \
  -e MONGO_URI="mongodb://mongodb:27017/idea_app" \
  -e SESSION_SECRET="Chamsha@31#" \
  chamsha123/project-backend:latest

echo "Deploying frontend container..."
docker run -d -p 3000:3000 --name frontend_c \
  -e REACT_APP_API_URL="http://$EC2_IP:4000/api" \
  chamsha123/project-frontend:latest

echo "Deployment complete. Running containers:"
docker ps
