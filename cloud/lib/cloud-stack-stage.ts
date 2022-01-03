// import * as cdk from '@aws-cdk/core'
// // import * as sqs from 'aws-cdk-lib/aws-sqs';
// import {CognitoConstruct} from "./cloud-cognito/CloudCognitoConstruct";
// import {CloudApiGatewayConstruct} from "./CloudApiGateway/CloudApiGatewayConstruct";
// import {UsersDynamoDbTable} from "./cloud-Dynamodb/UsersDynamoDbTable";
// import {CloudLambdaConstruct} from "./cloud-Lamdas/CloudLambdaConstruct";

// export class CloudStackStage extends cdk.Stack {

//     private static readonly API_ID = 'CloudApi'

//   constructor(scope:cdk.Construct, id: string, props?: cdk.StackProps) {
//     super(scope, id,{ 
//       ...props,
//       env:{
//           account:process.env.CDK_DEFAULT_ACCOUNT,
//           region:process.env.CDK_DEFAULT_REGION
//       }
//     });

    

//     const cloudCognitoConstruct = new CognitoConstruct(this)
//     const usersDynamoDbTable = new UsersDynamoDbTable(this);
//     const lambdaConstruct = new CloudLambdaConstruct(this, usersDynamoDbTable);
//     new CloudApiGatewayConstruct(this, cloudCognitoConstruct.userPoolArn, lambdaConstruct);
    
//   }
// }
