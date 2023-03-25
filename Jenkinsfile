pipeline {
    agent any

    stages {
        stage('Build') {
          steps {
            sh 'npm i && npm run compile'
          }
        }
        stage('Test') {
          steps {
            echo 'Testing...'
          }
        }
        stage('Docker Build') {
          when {
            expression {
              currentBuild.result == null || currentBuild.result == 'SUCCESS'
            }
          }
          steps {
            sh 'docker build -t cannalog-client .'
          }
        }
        stage('Docker Deploy') {
          when {
            expression {
              currentBuild.result == null || currentBuild.result == 'SUCCESS'
            }
          }
          steps {
            sh 'docker compose up -d'
          }
        }
    }
}
