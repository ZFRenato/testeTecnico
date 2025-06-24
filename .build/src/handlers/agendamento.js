"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const AgendamentoController_1 = require("../agendamento/controller/AgendamentoController");
const AgendamentoService_1 = require("../agendamento/service/AgendamentoService");
const agendamentoService = new AgendamentoService_1.AgendamentoService();
const agendamentoController = new AgendamentoController_1.AgendamentoController(agendamentoService);
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
        return await agendamentoController.handler(lambdaEvent, lambdaContext);
    }
    catch (error) {
        console.error('Erro no handler de agendamento:', error);
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
//# sourceMappingURL=agendamento.js.map