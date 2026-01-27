pipeline {
    agent any

    environment {
        DOCKER_USER = credentials('dockerhub-creds')   
        AWS_KEY     = credentials('aws-access-key')    
        AWS_SECRET  = credentials('aws-secret-key')
        
    }

    stages {

        stage('Checkout Code') {
            steps {
                // Pull repo into Jenkins workspace
                git branch: 'main', url: 'https://github.com/Nilmani31/Devops_Project.git'
            }
        }
        // Terraform stages
        stage('Terraform Init') {
            steps {
                dir("${WORKSPACE}") {
                    sh 'terraform init'
                }
            }
        }

        stage('Terraform Plan') {
            steps {
                dir("${WORKSPACE}") {
                    sh 'terraform plan -out=tfplan'
                }
            }
        }

        stage('Terraform Apply') {
            steps {
                dir("${WORKSPACE}") {
                    sh 'terraform apply -auto-approve tfplan'
                }
            }
        }

        

        // Docker stages
        stage('Build Docker Images') {
            steps {
                dir("${WORKSPACE}") {
                    sh 'chmod +x ./scripts/build.sh'
                    sh './scripts/build.sh'
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                dir("${WORKSPACE}") {
                    sh 'chmod +x ./scripts/push.sh'
                    sh "./scripts/push.sh $DOCKER_USER_USR $DOCKER_USER_PSW"
                }
            }
        }
        stage('Deploy via Ansible') {
            steps {
                dir("${WORKSPACE}") {
                    // Make sure your playbook has execute permissions
                    sh 'chmod +x ./ansible/deploy_idea_app.yml'
                    
                    // Run the playbook with the correct inventory
                    sh 'ansible-playbook -i ./ansible/inventory.ini ./ansible/deploy_idea_app.yml'
                }
            }
        }

        

        

        
    }

    post {
        success {
            echo "CI/CD pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed. Check Jenkins console for details."
        }
    }
}