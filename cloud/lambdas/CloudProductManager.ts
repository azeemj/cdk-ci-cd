
import {DocumentClient} from 'aws-sdk/clients/dynamodb';
import {ProductInputData} from './models/ProductInputData';
import {ProductData} from './models/ProductData';
import * as uuid from 'uuid';
import NotDetectedError from "./errors/NotDetectedError";
import * as AWSXRay from 'aws-xray-sdk-core';

const documentDbClient = new DocumentClient();
AWSXRay.captureAWSClient((documentDbClient as any).service);

export class CloudProductManager{


    public async create(user: ProductInputData):Promise<ProductData>{

        const newUser = {
            id : uuid.v4(),
            ...user
        };

        const params = {
            TableName: process.env.USERS_TABLE || '',
            Item: newUser
        }
        await documentDbClient.put(params).promise().catch(e => {
            console.error('Create user failed', e);
            throw new Error('Create user failed');
        });



        return newUser;
    }

    public async getById(id: string): Promise<ProductData> {
        const params = {
            TableName: process.env.USERS_TABLE || '',
            Key: {id}
        };
        const result = await documentDbClient.get(params).promise();
        if (result && result.Item) {
            return result.Item as ProductData;
        }
        throw new NotDetectedError();
    }


    public async getall(): Promise<ProductData[]> {
        const params = {
            TableName: process.env.USERS_TABLE || '',
        };
        const result = await documentDbClient.scan(params).promise();
        if (result && result.Items) {
            return result.Items.map(i => i as ProductData);
        }
        throw new Error('Get users error');
    }
    
}

export default new CloudProductManager();