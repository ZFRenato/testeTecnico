import { ApiResponse } from '../types';
export declare class ResponseUtil {
    static success<T>(data: T, message?: string): ApiResponse<T>;
    static error(error: string): ApiResponse<never>;
    static createLambdaResponse(statusCode: number, body: any, headers?: Record<string, string>): {
        statusCode: number;
        headers: {
            'Content-Type': string;
            'Access-Control-Allow-Origin': string;
            'Access-Control-Allow-Credentials': boolean;
        };
        body: string;
    };
    static ok<T>(data: T, message?: string): {
        statusCode: number;
        headers: {
            'Content-Type': string;
            'Access-Control-Allow-Origin': string;
            'Access-Control-Allow-Credentials': boolean;
        };
        body: string;
    };
    static created<T>(data: T, message?: string): {
        statusCode: number;
        headers: {
            'Content-Type': string;
            'Access-Control-Allow-Origin': string;
            'Access-Control-Allow-Credentials': boolean;
        };
        body: string;
    };
    static badRequest(error: string): {
        statusCode: number;
        headers: {
            'Content-Type': string;
            'Access-Control-Allow-Origin': string;
            'Access-Control-Allow-Credentials': boolean;
        };
        body: string;
    };
    static notFound(error: string): {
        statusCode: number;
        headers: {
            'Content-Type': string;
            'Access-Control-Allow-Origin': string;
            'Access-Control-Allow-Credentials': boolean;
        };
        body: string;
    };
    static internalServerError(error: string): {
        statusCode: number;
        headers: {
            'Content-Type': string;
            'Access-Control-Allow-Origin': string;
            'Access-Control-Allow-Credentials': boolean;
        };
        body: string;
    };
}
//# sourceMappingURL=response.d.ts.map