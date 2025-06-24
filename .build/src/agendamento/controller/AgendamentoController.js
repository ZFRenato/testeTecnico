"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgendamentoController = void 0;
const response_1 = require("../../utils/response");
const validation_1 = require("../../utils/validation");
class AgendamentoController {
    constructor(agendamentoService) {
        this.agendamentoService = agendamentoService;
    }
    async handler(event, context) {
        try {
            if (!event.body) {
                return response_1.ResponseUtil.badRequest('Body da requisição é obrigatório');
            }
            const body = JSON.parse(event.body);
            const validation = validation_1.ValidationUtil.validateAgendamento(body);
            if (validation.error) {
                return response_1.ResponseUtil.badRequest(validation.error);
            }
            if (!validation.value) {
                return response_1.ResponseUtil.badRequest('Dados de agendamento inválidos');
            }
            const agendamento = await this.agendamentoService.criarAgendamento(validation.value);
            const response = {
                mensagem: 'Agendamento realizado com sucesso',
                agendamento: {
                    id: agendamento.id,
                    medico: agendamento.medico,
                    paciente: agendamento.paciente,
                    data_horario: agendamento.data_horario,
                    status: agendamento.status,
                    data_criacao: agendamento.data_criacao,
                },
            };
            return response_1.ResponseUtil.created(response, 'Agendamento criado com sucesso');
        }
        catch (error) {
            console.error('Erro no controller de agendamento:', error);
            if (error instanceof Error) {
                if (error.message.includes('Data e hora devem ser futuras')) {
                    return response_1.ResponseUtil.badRequest(error.message);
                }
                if (error.message.includes('Horário já está ocupado')) {
                    return response_1.ResponseUtil.badRequest(error.message);
                }
            }
            return response_1.ResponseUtil.internalServerError('Erro interno do servidor');
        }
    }
}
exports.AgendamentoController = AgendamentoController;
//# sourceMappingURL=AgendamentoController.js.map