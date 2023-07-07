import type { AWS } from '@serverless/typescript'
import Resources from './deployment_resources/aws/Resources'
import Conditions from './deployment_resources/aws/Conditions'
import * as functions from './src/functions'

const serverlessConfiguration: AWS = {
  service: 'learning-analytics',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  useDotenv: true,
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      ANALYSIS_RESULTS_SQS_ARN: process.env.ANALYSIS_RESULTS_SQS_ARN || '${env:ANALYSIS_RESULTS_SQS_ARN}',
      DB_USERNAME: process.env.DB_USERNAME || '${env:DB_USERNAME}',
      DB_PASSWORD: process.env.DB_PASSWORD || '${env:DB_PASSWORD}',
      DB_BASE_NAME: process.env.DB_BASE_NAME || '${env:DB_BASE_NAME}',
      DB_PORT: process.env.DB_PORT || '${env:DB_PORT}',
      DB_HOST: process.env.DB_HOST || '${env:DB_HOST}',
      DB_LOGGING: process.env.DB_LOGGING || '${env:DB_LOGGING}',
      LAMBDA_TIMEOUT_SECONDS: process.env.LAMBDA_TIMEOUT_SECONDS || '${env:LAMBDA_TIMEOUT_SECONDS}',
      STAGE: process.env.STAGE || '${env:STAGE}',
    },
  },
  // import the function via paths
  package: {
    individually: true,
    patterns: ['node_modules/pg/**', 'node_modules/pg-hstore/**']
  },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk', 'pg-native'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  functions,
  resources: {
    Resources,
    Conditions,
  },
}

module.exports = serverlessConfiguration
