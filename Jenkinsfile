pipeline {
  agent any
  triggers {
    cron('30 23 * * *')   // 5:00 AM IST daily
  }
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
    stage('Smoke Tests') {
      steps {
        withCredentials([
          string(credentialsId: 'demowebshop-email',    variable: 'LOGIN_EMAIL'),
          string(credentialsId: 'demowebshop-password', variable: 'LOGIN_PASSWORD')
        ]) {
          bat 'npx playwright test --grep @smoke'
        }
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
      node('built-in') {
        archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
      }
    }
    success {
      echo 'Playwright test run completed successfully.'
      publishChecks(
        name: 'ci/jenkins-smoke-and-full',
        title: 'All checks passed',
        summary: 'Smoke and full test suite passed',
        conclusion: 'SUCCESS'
      )
    }
    failure {
      echo 'Playwright test run failed. Check the report and console output.'
      publishChecks(
        name: 'ci/jenkins-smoke-and-full',
        title: 'Tests failed',
        summary: 'Smoke or full test suite failed',
        conclusion: 'FAILURE'
      )
    }
  }
}