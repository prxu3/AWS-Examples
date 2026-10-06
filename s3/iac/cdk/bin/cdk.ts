#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { AwsCdkS3ExampleStack } from '../lib/cdk-stack';

const app = new cdk.App();
new AwsCdkS3ExampleStack(app, 'CdkStack');
