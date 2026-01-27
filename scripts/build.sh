#!/bin/bash
set -e

echo "Building updated frontend Docker image..."
docker build -t Chamsha123/chamsha123/project-frontend ./frontend

echo "Building updated backend Docker image..."
docker build -t Chamsha123/chamsha123/project-backend ./backend

echo "Build completed!"