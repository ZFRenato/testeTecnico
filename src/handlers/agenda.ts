import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { AgendaController } from '../agenda/controller/AgendaController';
import { AgendaService } from '../agenda/service/AgendaService';

const agendaService = new AgendaService();
const agendaController = new AgendaController(agendaService);

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

    return await agendaController.handler(lambdaEvent, lambdaContext);
  } catch (error) {
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