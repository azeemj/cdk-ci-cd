import {Aws, Construct, RemovalPolicy} from '@aws-cdk/core';
import {Attribute, AttributeType, Table} from '@aws-cdk/aws-dynamodb';

export class productsDynamoDbTable extends Table {

    public static readonly TABLE_ID = 'Products';
    public static readonly PARTITION_KEY = 'id';

    constructor(scope: Construct) {
        super(scope, productsDynamoDbTable.TABLE_ID, {
            tableName: `${Aws.STACK_NAME}-Products`,
            partitionKey: {
                name: productsDynamoDbTable.PARTITION_KEY,
                type: AttributeType.STRING
            } as Attribute,
            removalPolicy: RemovalPolicy.DESTROY,
        });
    }
}

// export default productsDynamoDbTable;