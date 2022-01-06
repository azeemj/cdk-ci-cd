import {APIGatewayEvent} from 'aws-lambda';
import {constants} from 'http2';
import CloudProductManager from '../CloudProductManager';

export const handler = async (event: APIGatewayEvent) => {
    const users = await CloudProductManager.getall();
    return {
        statusCode: constants.HTTP_STATUS_OK,
        body: JSON.stringify(users)
    };
};