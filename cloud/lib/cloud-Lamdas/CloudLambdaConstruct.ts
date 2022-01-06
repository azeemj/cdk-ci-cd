import {Construct} from '@aws-cdk/core';
import {CreateProductLambda} from './CreateProductLambda';
import {IFunction} from "@aws-cdk/aws-lambda";
import {Table} from "@aws-cdk/aws-dynamodb";
import {NodeModulesLayer} from "./NodeModulesLayer";
import {GetProductLambda} from './GetProductLambda';


export class CloudLambdaConstruct extends Construct {

    public static readonly ID = 'LamdaConstruct';

    public readonly createUserLambda: IFunction;
    public readonly getUsersLambda: IFunction;

    constructor(scope:Construct, productsDynamoDbTable: Table){
        super(scope,CloudLambdaConstruct.ID);
        const nodeJSModulesLayer = new NodeModulesLayer(this);

        this.createUserLambda = new CreateProductLambda(this,productsDynamoDbTable.tableName,nodeJSModulesLayer);
        productsDynamoDbTable.grantWriteData(this.createUserLambda);

        this.getUsersLambda = new GetProductLambda(this, productsDynamoDbTable.tableName, nodeJSModulesLayer);
        productsDynamoDbTable.grantReadData(this.getUsersLambda);

    }

}

