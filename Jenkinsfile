pipeline{
    agent any

    environment{
        DOCKER_CREDENTIALS = credentials('dockerhub-credentials')
    }

    stages{
        stage('Checkout'){
            steps{
                git 'https://github.com/rushi0212/notes.git'
            }
        }

        stage('Docker Login'){
            steps{
                sh 'echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR --password-stdin'
            }
        }

        stage('Build Image'){
            steps{
                sh 'docker compose build'
            }
        }

        stage('Push Image'){
            steps{
                sh 'docker composepush'
            }
        }
    }

    post{
        always{
            sh 'docker logout'
        }
    }
}
