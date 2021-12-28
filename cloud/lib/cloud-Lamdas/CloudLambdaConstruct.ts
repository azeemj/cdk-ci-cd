import {Construct} from '@aws-cdk/core';
import {CreateUserLambda} from './CreateUserLambda';
import {IFunction} from "@aws-cdk/aws-lambda";
import {Table} from "@aws-cdk/aws-dynamodb";
import {NodeModulesLayer} from "./NodeModulesLayer";
import {GetUsersLambda} from './GetUsersLambda';


export class LamdaConstruct extends Construct {

    public static readonly ID = 'LamdaConstruct';

    public readonly createUserLambda: IFunction;
    public readonly getUsersLambda: IFunction;

    constructor(scope:Construct, usersDynamoDbTable: Table){
        super(scope,LamdaConstruct.ID);
        const nodeJSModulesLayer = new NodeModulesLayer(this);

        this.createUserLambda = new CreateUserLambda(this,usersDynamoDbTable.tableName,nodeJSModulesLayer);
        usersDynamoDbTable.grantWriteData(this.createUserLambda);

        this.getUsersLambda = new GetUsersLambda(this, usersDynamoDbTable.tableName, nodeJSModulesLayer);
        usersDynamoDbTable.grantReadData(this.getUsersLambda);

    }

}

