pipeline {
    agent any
    triggers {
		pollSCM("*/5 * * * *")
	}
    stages {
        stage("Build Web") {
            steps {
                sh "npm install" 
                sh "ng build --prod" 
                sh "docker build -t mrbacky/golden-hammer-frontend -f docker/Dockerfile . " 

            }
        }
        stage("Deliver Web to Docker Hub") {
            steps {
              withCredentials(
                [usernamePassword(credentialsId: 'DockerHub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) 
                {
                  sh 'docker login -u ${USERNAME} -p ${PASSWORD}'
                  sh "docker push mrbacky/golden-hammer-frontend"
                }
            }
        }
       
        stage("Release to staging") {
            steps {
                sh "docker-compose -p staging -f docker/docker-compose.yml -f docker/docker-compose.staging.yml up -d"
            }
        }
        stage("Release to production") {
            input { 
                message "Release to production?"
            }
            steps {
                sh "docker-compose -p production -f docker/docker-compose.yml -f docker/docker-compose.production.yml up -d"

            }
        }
    }
} 