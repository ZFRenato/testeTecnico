import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { AgendamentoController } from '../agendamento/controller/AgendamentoController';
import { AgendamentoService } from '../agendamento/service/AgendamentoService';

const agendamentoService = new AgendamentoService();
const agendamentoController = new AgendamentoController(agendamentoService);

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    // Converter APIGatewayProxyEvent para LambdaEvent
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
  } catch (error) {
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