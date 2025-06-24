"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseUtil = void 0;
class ResponseUtil {
    static success(data, message) {
        return {
            success: true,
            data,
            message,
        };
    }
    static error(error) {
        return {
            success: false,
            error,
        };
    }
    static createLambdaResponse(statusCode, body, headers = {}) {
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
    static ok(data, message) {
        return this.createLambdaResponse(200, this.success(data, message));
    }
    static created(data, message) {
        return this.createLambdaResponse(201, this.success(data, message));
    }
    static badRequest(error) {
        return this.createLambdaResponse(400, this.error(error));
    }
    static notFound(error) {
        return this.createLambdaResponse(404, this.error(error));
    }
    static internalServerError(error) {
        return this.createLambdaResponse(500, this.error(error));
    }
}
exports.ResponseUtil = ResponseUtil;
//# sourceMappingURL=response.js.map