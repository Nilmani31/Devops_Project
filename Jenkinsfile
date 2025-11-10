pipeline {
    agent any

    environment {
        PROJECT_DIR = "/mnt/c/Users/chamsha nilmani/Documents/semester 5/Devops/Project"
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Pulling code from GitHub..."
                checkout scm
            }
        }

        stage('Run Containers') {
            steps {
                dir("${PROJECT_DIR}") {
                    
                    sh 'docker compose up -d'
                }
            }
        }

        stage('Check Running Containers') {
            steps {
                sh 'docker ps'
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful! Your Docker Hub images are safe.'
        }
        failure {
            echo '❌ Deployment failed!'
        }
    }
}
