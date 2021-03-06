pipeline {
    agent any
    triggers {
		pollSCM("*/10 * * * *")
	}
    options {
        timeout(time: 1, unit: 'HOURS')
    }
    stages {
        stage("Build Web") {
            steps {
                sh "npm install" 
                sh "ng build --prod" 
            }
        }
        stage("Build Docker Image") {
            steps {
                sh "docker build -t domco545/golden-hammer-frontend -f docker/Dockerfile . " 
            }
        }
        stage("Deliver Web to Docker Hub") {
            steps {
              withCredentials(
                [usernamePassword(credentialsId: 'DockerHub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) 
                {
                  sh 'docker login -u ${USERNAME} -p ${PASSWORD}'
                  sh "docker push domco545/golden-hammer-frontend"
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
                withCredentials(
                [usernamePassword(credentialsId: 'Firebase', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')])
                {
                    sh 'firebase deploy --token ${PASSWORD}'
                }
            }
        }
    }
} 