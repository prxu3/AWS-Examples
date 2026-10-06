import * as cdk from 'aws-cdk-lib/core';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { AwsCdkS3ExampleStack } from '../lib/cdk-stack';

test('S3 bucket created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new AwsCdkS3ExampleStack(app, 'MyTestStack');
  // THEN

  const template = Template.fromStack(stack);

  template.resourceCountIs('AWS::S3::Bucket', 1);
  template.hasOutput('BucketName', {
    Value: Match.anyValue(),
    Description: 'The name of the S3 bucket'
  });
});
