import {APIGatewayEvent} from 'aws-lambda';
import {constants} from 'http2';
import CloudUserManager from '../CloudUserManager';

export const handler = async (event: APIGatewayEvent) => {
    const users = await CloudUserManager.getall();
    return {
        statusCode: constants.HTTP_STATUS_OK,
        body: JSON.stringify(users)
    };
};