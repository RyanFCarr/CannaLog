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
              sh 'docker network inspect cannalog >/dev/null 2>&1 || docker network create cannalog'
              sh 'docker volume create cannalog-db'
              sh 'docker run -d --name cannalog-db -v cannalog-db:/var/lib/mysql --network=cannalog --restart=unless-stopped -e MYSQL_RANDOM_ROOT_PASSWORD=true -e MYSQL_USER=${MYSQL_USER} -e MYSQL_DATABASE=${MYSQL_DATABASE} -e MYSQL_PASSWORD=${MYSQL_PASSWORD} mysql'
              sh 'docker-compose up -d'
            }
          }
        }
    }
}
