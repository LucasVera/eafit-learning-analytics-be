type ExecutionRoleStatement = {
  Effect: 'Allow' | 'Deny'
  Action: string[]
  Resource: string | { 'Fn::GetAtt': string[] } | { Ref: string }
}

export default [
  // Rekognition
  {
    Effect: 'Allow',
    Action: [
      'rekognition:DetectFaces',
      'rekognition:SearchFacesByImage',
      'rekognition:IndexFaces'
    ],
    Resource: '*'
  },

  // DynamoDB
  {
    Effect: 'Allow',
    Action: [
      'dynamodb:List*',
      'dynamodb:BatchGet*',
      'dynamodb:DescribeTable',
      'dynamodb:Get*',
      'dynamodb:Query',
      'dynamodb:PutItem',
    ],
    Resource: { "Fn::GetAtt": ["FaceAnalysisResultsTable", "Arn"] }
  },

  // S3
  {
    Effect: 'Allow',
    Action: [
      's3:GetObject',
      's3:GetObjectMetadata',
      's3:PutObject'
    ],
    Resource: [
      `arn:aws:s3:::${process.env.BUCKET_NAME || '${env:BUCKET_NAME}'}-*/*`,
      `arn:aws:s3:::${process.env.CLASS_FACES_BUCKET_NAME || '${env:CLASS_FACES_BUCKET_NAME}'}-*/*`
    ],
  },

  // SNS
  {
    Effect: 'Allow',
    Action: [
      'sns:Publish',
    ],
    Resource: { "Ref": "AnalysisResultsTopic" }
  }
] as ExecutionRoleStatement[]
