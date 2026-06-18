pipeline {
  agent any

  environment {
    CI = 'true'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        bat 'npm ci --no-audit --no-fund'
      }
    }

    stage('Install Playwright browsers') {
      steps {
        bat 'npx playwright install'
      }
    }

    stage('Run Playwright tests') {
      steps {
        withCredentials([
          string(credentialsId: 'demowebshop-email',    variable: 'LOGIN_EMAIL'),
          string(credentialsId: 'demowebshop-password', variable: 'LOGIN_PASSWORD')
        ]) {
          bat 'npm run test:ci'
        }
      }
    }
  }

  post {
    always {
      node('built-in') {               // ← fixes "Required context class hudson.FilePath is missing"
        archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
      }
    }
    success {
      echo 'Playwright test run completed successfully.'
    }
    failure {
      echo 'Playwright test run failed. Check the report and console output.'
    }
  }
}