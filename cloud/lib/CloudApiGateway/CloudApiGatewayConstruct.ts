import * as c from '@aws-cdk/core'
import {AuthorizationType,CfnAuthorizer,LambdaIntegration,RestApi} from '@aws-cdk/aws-apigateway';
import {CloudLambdaConstruct} from "../cloud-Lamdas/CloudLambdaConstruct";
import {CognitoConstruct} from "../cloud-cognito/CloudCognitoConstruct";
import { Construct } from '@aws-cdk/core';


export class CloudApiGatewayConstruct extends Construct{
    public static readonly ID = 'UserManagerApiGateway';

    constructor(scope: Construct, cognitoUserPoolArn: string, lambdas: CloudLambdaConstruct) {
        super(scope, CloudApiGatewayConstruct.ID);
        const restApi = new RestApi(this, CloudApiGatewayConstruct.ID, {
            restApiName: 'User Manager API'
        })

        const authorizer = new CfnAuthorizer(this, 'cfnAuth', {
            restApiId: restApi.restApiId,
            name: 'UserManagerApiAuthorizer',
            type: 'COGNITO_USER_POOLS',
            identitySource: 'method.request.header.Authorization',
            providerArns: [cognitoUserPoolArn],
        })

        const authorizationParams = {
            authorizationType: AuthorizationType.COGNITO,
            authorizer: {
                authorizerId: authorizer.ref
            },
            authorizationScopes: [`${CognitoConstruct.USER_POOL_RESOURCE_SERVER_ID}/user-manager-client`]
        };




        // -----------------Lmada integration-----------------------
        const userResource = restApi.root.addResource('users');
        userResource.addMethod('POST', new LambdaIntegration(lambdas.createUserLambda), authorizationParams);
        userResource.addMethod('GET', new LambdaIntegration(lambdas.getUsersLambda), authorizationParams);
    }

   





}