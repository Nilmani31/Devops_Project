#!/bin/bash
set -e

# Frontend
docker build -t chamsha123/chamsha123/project-frontend:latest ./frontend
# Backend
docker build -t chamsha123/chamsha123/project-backend:latest ./backend
echo "Build completed successfully!"