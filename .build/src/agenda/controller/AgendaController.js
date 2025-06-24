"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgendaController = void 0;
const response_1 = require("../../utils/response");
const validation_1 = require("../../utils/validation");
class AgendaController {
    constructor(agendaService) {
        this.agendaService = agendaService;
    }
    async handler(event, context) {
        try {
            const queryParams = event.queryStringParameters || {};
            const validation = validation_1.ValidationUtil.validateAgendaQuery(queryParams);
            if (validation.error) {
                return response_1.ResponseUtil.badRequest(validation.error);
            }
            const { medico, data } = validation.value || {};
            const agendas = await this.agendaService.buscarAgendas(medico, data);
            return response_1.ResponseUtil.ok(agendas, 'Agendas encontradas com sucesso');
        }
        catch (error) {
            console.error('Erro no controller de agenda:', error);
            return response_1.ResponseUtil.internalServerError('Erro interno do servidor');
        }
    }
}
exports.AgendaController = AgendaController;
//# sourceMappingURL=AgendaController.js.map