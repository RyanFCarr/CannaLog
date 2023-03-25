pipeline {
    agent any

    stages {
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
            withEnv(readFile('../../.env/cannalog-client.env').split('\n') as List) {
              sh 'docker-compose up -d'
            }
          }
        }
    }
}
