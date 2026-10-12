pipeline {
  agent any

  tools {
    nodejs 'node22'
  }

  environment {
    CLOUDFLARE_API_TOKEN  = credentials('cloudflare-api-token')
    CLOUDFLARE_ACCOUNT_ID = credentials('cloudflare-account-id')
  }

  stages {
    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Lint') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('SonarQube Analysis') {
      environment {
        scannerHome = tool 'sonar-scanner'
      }
      steps {
        withSonarQubeEnv('sonarqube') {
          sh "${scannerHome}/bin/sonar-scanner"
        }
      }
    }

    stage('Quality Gate') {
      steps {
        timeout(time: 5, unit: 'MINUTES') {
          waitForQualityGate abortPipeline: true
        }
      }
    }

    stage('Deploy') {
      steps {
        sh '''
          sed -i 's/"name": "learn-actions"/"name": "learn-jenkins"/; s/learn-actions.khalidlab.tech/learn-jenkins.khalidlab.tech/' wrangler.jsonc
          grep -E 'name|pattern' wrangler.jsonc
          npm run deploy
        '''
      }
    }
  }

  post {
    success { echo 'Deployed: https://learn-jenkins.khalidlab.tech' }
    failure { echo 'Pipeline failed, check the stage logs' }
  }
}