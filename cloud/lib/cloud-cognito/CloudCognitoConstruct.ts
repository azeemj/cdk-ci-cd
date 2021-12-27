import {CfnOutput,Construct} from '@aws-cdk/core';
import {CfnUserPoolResourceServer, OAuthScope,UserPool,UserPoolClient, UserPoolDomain} from '@aws-cdk/aws-cognito';


export class CloudCognitoConstruct extends Construct{
    public static readonly CLOUD_USER_POOL_ID = 'CloudStackCDK';
    public static readonly CLOUD_USER_POOL_CLIENT_ID = 'CloudStackCDK-client';
    public static readonly CLOUD_USER_POOL_DOMAIN_ID = 'CloudStackCDK-user-pool-domain';
    public static readonly CLOUD_USER_POOL_RESOURCE_ID = 'https://resource-server.com';
    public readonly userPoolArn:String;
    

    constructor(scope:Construct){
        //---------------User pool with Cognito-------------------
        super(scope,CloudCognitoConstruct.CLOUD_USER_POOL_ID);
        const cognitoUserPool = new UserPool(this,CloudCognitoConstruct.CLOUD_USER_POOL_ID,{})

        //- ----------- User pool resorce allocation-------------

        new CfnUserPoolResourceServer(this,'cdk-userpool-dev-server',
        {
            identifier: CloudCognitoConstruct.CLOUD_USER_POOL_RESOURCE_ID,
            name: "userpool-resource-server",
            userPoolId: cognitoUserPool.userPoolId,
            scopes: [
                {
                    scopeDescription: "CDK client opeartion operations",
                    scopeName: CloudCognitoConstruct.CLOUD_USER_POOL_CLIENT_ID
                },
            ],
        })


        new UserPoolClient(this, CloudCognitoConstruct.CLOUD_USER_POOL_ID, {
            userPool: cognitoUserPool,
            generateSecret: true,
            oAuth: {
                flows: {
                    clientCredentials: true
                },
                scopes: [OAuthScope.custom(`${CloudCognitoConstruct.CLOUD_USER_POOL_RESOURCE_ID}/user-manager-client`)],
            },
        })

        const userPoolDomain = new UserPoolDomain(this, CloudCognitoConstruct.CLOUD_USER_POOL_DOMAIN_ID, {
            userPool: cognitoUserPool,
            cognitoDomain: {
                domainPrefix: 'user-manager-serverless'
            }
        })

        this.userPoolArn = cognitoUserPool.userPoolArn;

        new CfnOutput(this, 'UserPoolUrl', {
            exportName: `UserPoolUrl`,
            value: `https://${userPoolDomain.domainName}.auth.us-east-1.amazoncognito.com`
        });
    }




}