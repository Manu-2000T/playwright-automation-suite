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
        sh 'npm ci'
      }
    }

    stage('Install Playwright browsers') {
      steps {
        sh 'npx playwright install --with-deps'
      }
    }

    stage('Run Playwright tests') {
      steps {
        sh 'npm run test:ci'
      }
    }
  }

  post {
    always {
      publishHTML(target: [
        allowMissing: true,
        alwaysLinkToLastBuild: true,
        keepAll: true,
        reportDir: 'playwright-report',
        reportFiles: 'index.html',
        reportName: 'Playwright Report'
      ])
    }
    success {
      echo 'Playwright test run completed successfully.'
    }
    failure {
      echo 'Playwright test run failed. Check the report and console output.'
    }
  }
}
