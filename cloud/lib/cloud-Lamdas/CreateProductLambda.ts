import {Construct} from '@aws-cdk/core';
import {ManagedPolicy, Role, ServicePrincipal} from '@aws-cdk/aws-iam';
import {Code, Function, LayerVersion} from '@aws-cdk/aws-lambda';
import {defaultFunctionProps} from './DefaultFunctionProps';
import {resolve} from "path";

export class CreateProductLambda extends Function {
    public static readonly ID = 'CreateUserLambda';

    constructor(scope: Construct, productTableName: string, layer: LayerVersion) {
        super(scope, CreateProductLambda.ID, {
            ...defaultFunctionProps,
            code: Code.fromAsset(resolve(__dirname, `../../lambdas`)),
            handler: 'handlers/CreateProductrHandler.handler',
            layers: [layer],
            role: new Role(scope, `${CreateProductLambda.ID}_role`, {
                assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
                managedPolicies: [
                    ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
                ]
            }),
            environment: {
                USERS_TABLE: productTableName
            }
        });
    }
}