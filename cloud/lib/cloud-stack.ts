import * as cdk from '@aws-cdk/core'
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import {} from "./cloud-cognito";

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

    
  }
}
