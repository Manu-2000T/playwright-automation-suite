pipeline {
  agent any

  environment {
    CI = 'true'
    LOGIN_EMAIL = credentials('demowebshop-email')
    LOGIN_PASSWORD = credentials('demowebshop-password')
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
        bat 'npx playwright install --with-deps'
      }
    }

    stage('Run Playwright tests') {
      steps {
        bat 'npm run test:ci'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
    }
    success {
      echo 'Playwright test run completed successfully.'
    }
    failure {
      echo 'Playwright test run failed. Check the report and console output.'
    }
  }
}
