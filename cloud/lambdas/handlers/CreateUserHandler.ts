import {APIGatewayEvent} from 'aws-lambda';
import {constants} from 'http2';
import {JSONParse} from "../utils/JSONParse";
import {UserInputData} from "../models/UserInputData";
import CloudUserManager from '../CloudUserManager';

export const handler = async (event: APIGatewayEvent) => {
    const userInputDto = JSONParse<UserInputData>(event.body);
    const createdUser = await CloudUserManager.create(userInputDto)
    return {
        statusCode: constants.HTTP_STATUS_CREATED,
        body: JSON.stringify(createdUser)
    };
};