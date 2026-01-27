#!/bin/bash
set -e

echo "Building frontend Docker image..."
docker build -t chamsha123/project-frontend:latest ./frontend

echo "Building backend Docker image..."
docker build -t chamsha123/project-backend:latest ./backend

echo "Build completed successfully!"
