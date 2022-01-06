import {CfnOutput, Construct} from '@aws-cdk/core';
import {CfnUserPoolResourceServer, OAuthScope, UserPool, UserPoolClient, UserPoolDomain} from "@aws-cdk/aws-cognito";

export class CognitoConstruct extends Construct {
    public static readonly USER_POOL_ID = 'ProductManagerUserPool';
    public static readonly USER_POOL_CLIENT_ID = 'product-manager-client';
    public static readonly USER_POOL_DOMAIN_ID = 'product-manager-user-pool-domain';
    public static readonly USER_POOL_RESOURCE_SERVER_ID = 'https://resource-server.com';
    public readonly userPoolArn: string;

    constructor(scope: Construct) {
        super(scope, CognitoConstruct.USER_POOL_ID);
        const cognitoUserPool = new UserPool(this, CognitoConstruct.USER_POOL_ID, {})

        new CfnUserPoolResourceServer(this, "dev-userpool-resource-server", {
            identifier: CognitoConstruct.USER_POOL_RESOURCE_SERVER_ID,
            name: "userpool-resource-server",
            userPoolId: cognitoUserPool.userPoolId,
            scopes: [
                {
                    scopeDescription: "Perform client operations",
                    scopeName: "product-manager-client",
                },
            ],
        });

        new UserPoolClient(this, CognitoConstruct.USER_POOL_CLIENT_ID, {
            userPool: cognitoUserPool,
            generateSecret: true,
            oAuth: {
                flows: {
                    clientCredentials: true
                },
                scopes: [OAuthScope.custom(`${CognitoConstruct.USER_POOL_RESOURCE_SERVER_ID}/product-manager-client`)],
            },
        })

        const userPoolDomain = new UserPoolDomain(this, CognitoConstruct.USER_POOL_DOMAIN_ID, {
            userPool: cognitoUserPool,
            cognitoDomain: {
                domainPrefix: 'product-manager-serverless'
            }
        })

        this.userPoolArn = cognitoUserPool.userPoolArn;

        new CfnOutput(this, 'UserPoolUrl', {
            exportName: `UserPoolUrl`,
            value: `https://${userPoolDomain.domainName}.auth.us-east-1.amazoncognito.com`
        });
    }
}
