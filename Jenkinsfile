pipeline {
    agent any
    triggers {
		pollSCM("*/5 * * * *")
	}
    stages {
        stage("Build Web") {
            steps {
                sh "node -v"
                sh "npm install" 
                sh "npm run build" 
                sh "docker build -t domco545/golden-hammer-frontend:staging -f Dockerfile.staging . " 

            }
        }
        stage("Deliver Web to Docker Hub") {
            steps {
              withCredentials(
                [usernamePassword(credentialsId: 'DockerHub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) 
                {
                  sh 'docker login -u ${USERNAME} -p ${PASSWORD}'
                  sh "docker push domco545/golden-hammer-frontend:staging"
                }
            }
        }
       
        stage("Release to test") {
            steps {
                sh "docker-compose -p golden-hammer-frontend -f docker-compose.staging.yml up -d"
            }
        }
        // stage("Release to production") {
        //     input { 
        //         message "Release to production?"
        //     }
        //     steps {
        //         echo "not implemented"
        //     }
        // }
    }
} 