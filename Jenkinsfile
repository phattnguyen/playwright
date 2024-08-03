pipeline {
    agent any
     tools {
        nodejs "node"
        }
    stages {
        stage('Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/phattnguyen/playwright.git']])
            }
        }
        stage('Install Playwright') {
            steps {
                sh '''
                    npm i -D @playwright/test && npx playwright install
            '''
            }
        }
        stage('Execute Tests') {
            steps {
                sh '''
                    npx playwright test assignment5.spec.ts --project=chrome
                '''
            }
        }
    }
}