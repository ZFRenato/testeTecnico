import { ApiResponse } from '../types';

export class ResponseUtil {
  static success<T>(data: T, message?: string): ApiResponse<T> {
    return {
      success: true,
      data,
      message,
    };
  }

  static error(error: string): ApiResponse<never> {
    return {
      success: false,
      error,
    };
  }

  static createLambdaResponse(
    statusCode: number,
    body: any,
    headers: Record<string, string> = {}
  ) {
    return {
      statusCode,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        ...headers,
      },
      body: JSON.stringify(body),
    };
  }

  static ok<T>(data: T, message?: string) {
    return this.createLambdaResponse(200, this.success(data, message));
  }

  static created<T>(data: T, message?: string) {
    return this.createLambdaResponse(201, this.success(data, message));
  }

  static badRequest(error: string) {
    return this.createLambdaResponse(400, this.error(error));
  }

  static notFound(error: string) {
    return this.createLambdaResponse(404, this.error(error));
  }

  static internalServerError(error: string) {
    return this.createLambdaResponse(500, this.error(error));
  }
} 