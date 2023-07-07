import { handlerPath } from '@libs/handler-resolver'

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: process.env.ANALYSIS_RESULTS_SQS_ARN || '${env:ANALYSIS_RESULTS_SQS_ARN}'
    }
  ],
}
