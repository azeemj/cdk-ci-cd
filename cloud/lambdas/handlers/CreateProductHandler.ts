import {APIGatewayEvent} from 'aws-lambda';
import {constants} from 'http2';
import {JSONParse} from "../utils/JSONParse";
import {ProductInputData} from "../models/ProductInputData";
import CloudProductManager from '../CloudProductManager';

export const handler = async (event: APIGatewayEvent) => {
    const userInputDto = JSONParse<ProductInputData>(event.body);
    const createdUser = await CloudProductManager.create(userInputDto)
    return {
        statusCode: constants.HTTP_STATUS_CREATED,
        body: JSON.stringify(createdUser)
    };
};