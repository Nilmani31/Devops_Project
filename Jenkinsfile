pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = "chamsha123"      // Docker Hub username
        FRONTEND_IMAGE = "project-frontend"
        BACKEND_IMAGE = "project-backend"
        IMAGE_TAG = "latest"
    }

    stages {
        stage('Clean Workspace') {
            steps {
                echo "🧹 Cleaning workspace..."
                deleteDir() // deletes everything in the workspace
            }
        }

        stage('Checkout') {
            steps {
                echo "📦 Cloning repository..."
                git branch: 'main', url: 'https://github.com/Nilmani31/Devops_Project.git'
            }
        }

        stage('Build and Tag Docker Images') {
            steps {
                echo "⚙️ Building Docker images..."
                sh 'docker compose build --pull' // pulls latest base images

                echo "🏷️ Tagging images for Docker Hub..."
                sh """
                    docker tag ${FRONTEND_IMAGE}:latest ${DOCKER_HUB_USER}/${FRONTEND_IMAGE}:${IMAGE_TAG}
                    docker tag ${BACKEND_IMAGE}:latest ${DOCKER_HUB_USER}/${BACKEND_IMAGE}:${IMAGE_TAG}
                """
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh """
                        echo "🔐 Logging into Docker Hub..."
                        echo "$PASSWORD" | docker login -u "$USERNAME" --password-stdin

                        echo "📤 Pushing frontend image..."
                        docker push ${DOCKER_HUB_USER}/${FRONTEND_IMAGE}:${IMAGE_TAG}

                        echo "📤 Pushing backend image..."
                        docker push ${DOCKER_HUB_USER}/${BACKEND_IMAGE}:${IMAGE_TAG}

                        docker logout
                    """
                }
            }
        }

        stage('Run Containers') {
            steps {
                echo "🚀 Starting containers..."
                sh 'docker compose up -d'
            }
        }

        stage('Check Running Containers') {
            steps {
                echo "🔍 Listing running containers..."
                sh 'docker ps'
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful! Images pushed to Docker Hub and containers are running.'
        }
        failure {
            echo '❌ Deployment failed! Check logs above for details.'
        }
    }
}
