#!/bin/bash
set -e

echo "Stopping existing containers..."
docker stop frontend_c || true
docker rm frontend_c || true
docker stop backend_c || true
docker rm backend_c || true
docker stop mongo_c || true
docker rm mongo_c || true

echo "Deploying MongoDB container..."
docker run -d -p 27017:27017 --name  mongo_c mongo:6.0

echo "Deploying backend container..."
docker run -d -p 4000:4000 --name backend_c \
  --link mongo_c:mongodb \
  Chamsha123/chamsha123/project-backend

echo "Deploying frontend container..."
docker run -d -p 3000:3000 --name frontend_c \
  --link backend_c:backend \
  Chamsha123/chamsha123/project-frontend

echo "Deployment complete. Running containers:"
docker ps