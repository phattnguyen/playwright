pipeline {
    agent any
     tools {
        nodejs "node"
        }
    stages {
        stage('Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/phattnguyen/playwright']])
            }
        }
        stage('Install') {
            steps {
                sh '''
                    npm i -D @playwright/test && npx playwright install
            '''
            }
        }
        stage('Testing') {
            steps {
                sh '''
                    npx playwright test --project=chromium
                '''
            }
        }
    }
}