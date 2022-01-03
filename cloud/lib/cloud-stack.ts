import * as cdk from '@aws-cdk/core'
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import {CognitoConstruct} from "./cloud-cognito/CloudCognitoConstruct";
import {CloudApiGatewayConstruct} from "./CloudApiGateway/CloudApiGatewayConstruct";
import {productsDynamoDbTable} from "./cloud-Dynamodb/productsDynamoDbTable";
import {CloudLambdaConstruct} from "./cloud-Lamdas/CloudLambdaConstruct";

export class CloudStack extends cdk.Stack {

    private static readonly API_ID = 'CloudApi'

  constructor(scope:cdk.Construct, id: string, props?: cdk.StackProps) {
    console.log('test',props);
    super(scope, id,{ 
      ...props,
      env:{
          account:process.env.CDK_DEFAULT_ACCOUNT,
          region:props?.env?.region
      }
    });

    

    const cloudCognitoConstruct = new CognitoConstruct(this)
    const productDynamoDbTable = new productsDynamoDbTable(this);
    const lambdaConstruct = new CloudLambdaConstruct(this, productDynamoDbTable);
    new CloudApiGatewayConstruct(this, cloudCognitoConstruct.userPoolArn, lambdaConstruct);
    
  }
}
