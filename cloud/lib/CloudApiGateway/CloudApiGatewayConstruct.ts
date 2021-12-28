import * as c from '@aws-cdk/core'
import {AuthorizationType,CfnAuthorizer,LambdaIntegration,RestApi} from '@aws-cdk/aws-apigateway';
import {LamdaConstruct} from "../cloud-Lamdas/CloudLambdaConstruct";
import {CloudCognitoConstruct} from "../cloud-cognito/CloudCognitoConstruct";
import { Construct } from '@aws-cdk/core';


export class CloudApiGatewayConstruct extends Construct{
    public static readonly ID = 'CDKUserManagerApiGateway';

// ---------------defining API gateway-------------//
    constructor(scope:Construct,CognitoUsrPoolArn:string,lamdas:LamdaConstruct){
        super(scope, CloudApiGatewayConstruct.ID);
        const restApi = new RestApi(this, CloudApiGatewayConstruct.ID,{
            restApiName:'IIT Rest API manager'
        });


        const authorier = new CfnAuthorizer(this, 'cfnAuth',
        {
            restApiId:restApi.restApiId,
            name:'CDKAPIAuhtorizer',
            type:'COGNIO_USER_POOLS',
            identitySource:'method.request.header.Authorization',
            providerArns:[CognitoUsrPoolArn],
  
        })


        const authorizationParam = {
            authorizationType: AuthorizationType.COGNITO,
            authorizer: {
                authorizerId: authorier.ref
            },
            authorizationScopes: [`${CloudCognitoConstruct.CLOUD_USER_POOL_RESOURCE_ID}/user-manager-client`]
        };


        // -----------------Lmada integration-----------------------
        const userResource = restApi.root.addResource('users');
        userResource.addMethod('POST', new LambdaIntegration(lamdas.createUserLambda), authorizationParam);
        userResource.addMethod('POST', new LambdaIntegration(lamdas.getUsersLambda), authorizationParam);
    }

   





}