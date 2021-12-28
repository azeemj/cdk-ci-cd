import * as cdk from '@aws-cdk/core'
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import {CloudCognitoConstruct} from "./cloud-cognito/CloudCognitoConstruct";

export class CloudStack extends cdk.Stack {

    private static readonly API_ID = 'CloudApi'

  constructor(scope:cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id,{ 
      ...props,
      env:{
          account:process.env.CDK_DEFAULT_ACCOUNT,
          region:process.env.CDK_DEFAULT_REGION
      }
    });


    const cloudCognitoConstruct = new CloudCognitoConstruct(this)
    new ApiGatewayConstruct(this, cloudCognitoConstruct.userPoolArn, lambdaConstruct);
    
  }
}
