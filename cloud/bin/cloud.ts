#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CloudStack } from '../lib/cloud-stack';
// import { CloudStackStage } from '../lib/cloud-stack-stage';

const app = new cdk.App();

const stage = false;

if(stage){
 // production
new CloudStack(app, 'CloudStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  
  env: { account: '853595480311', region: 'us-west-2'}

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
 });
}


if(!stage){

// dev 
new CloudStack(app, 'CloudStack', {
  env: { account: '853595480311', region: 'us-west-1' },

});



}

 




