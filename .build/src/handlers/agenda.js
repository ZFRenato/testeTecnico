"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const AgendaController_1 = require("../agenda/controller/AgendaController");
const AgendaService_1 = require("../agenda/service/AgendaService");
const agendaService = new AgendaService_1.AgendaService();
const agendaController = new AgendaController_1.AgendaController(agendaService);
const handler = async (event, context) => {
    try {
        const lambdaEvent = {
            httpMethod: event.httpMethod,
            path: event.path,
            headers: event.headers || {},
            queryStringParameters: event.queryStringParameters,
            body: event.body,
        };
        const lambdaContext = {
            functionName: context.functionName,
            functionVersion: context.functionVersion,
            invokedFunctionArn: context.invokedFunctionArn,
            memoryLimitInMB: context.memoryLimitInMB,
            awsRequestId: context.awsRequestId,
            logGroupName: context.logGroupName,
            logStreamName: context.logStreamName,
            callbackWaitsForEmptyEventLoop: context.callbackWaitsForEmptyEventLoop,
            getRemainingTimeInMillis: context.getRemainingTimeInMillis,
            done: context.done,
            fail: context.fail,
            succeed: context.succeed,
        };
        return await agendaController.handler(lambdaEvent, lambdaContext);
    }
    catch (error) {
        console.error('Erro no handler de agenda:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({
                success: false,
                error: 'Erro interno do servidor',
            }),
        };
    }
};
exports.handler = handler;
//# sourceMappingURL=agenda.js.map