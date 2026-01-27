pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = "chamsha123"
        FRONTEND_IMAGE = "project-frontend"
        BACKEND_IMAGE = "project-backend"
        IMAGE_TAG = "latest"
    }

    stages {
        // You can remove Clean Workspace or keep it but skip deleting the repo
        stage('Clean Workspace') {
            steps {
                echo "🧹 Optional: cleaning workspace..."
                // deleteDir()   <-- REMOVE this if using job SCM to avoid deleting the repo
            }
        }

        stage('Build and Tag Docker Images') {
            steps {
                echo "⚙️ Building Docker images..."
                sh 'docker compose build --pull'

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
                        echo "$PASSWORD" | docker login -u "$USERNAME" --password-stdin
                        docker push ${DOCKER_HUB_USER}/${FRONTEND_IMAGE}:${IMAGE_TAG}
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
