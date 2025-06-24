"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgendamentoService = void 0;
const agendamentos_1 = require("../mocks/agendamentos");
const validation_1 = require("../../utils/validation");
class AgendamentoService {
    async criarAgendamento(dados) {
        try {
            const { agendamento } = dados;
            if (!validation_1.ValidationUtil.validateDateTime(agendamento.data_horario)) {
                throw new Error('Data e hora devem ser futuras');
            }
            const agendamentoExistente = agendamentos_1.agendamentosMock.find((a) => a.medico === agendamento.medico &&
                a.data_horario === agendamento.data_horario &&
                a.status !== 'cancelado');
            if (agendamentoExistente) {
                throw new Error('Horário já está ocupado para este médico');
            }
            const novoAgendamento = {
                id: (agendamentos_1.agendamentosMock.length + 1).toString(),
                medico: agendamento.medico,
                paciente: agendamento.paciente,
                data_horario: agendamento.data_horario,
                status: 'confirmado',
                data_criacao: new Date().toISOString(),
            };
            agendamentos_1.agendamentosMock.push(novoAgendamento);
            return novoAgendamento;
        }
        catch (error) {
            throw new Error(`Erro ao criar agendamento: ${error}`);
        }
    }
    async buscarAgendamentos() {
        try {
            return [...agendamentos_1.agendamentosMock];
        }
        catch (error) {
            throw new Error(`Erro ao buscar agendamentos: ${error}`);
        }
    }
    async buscarAgendamentoPorId(id) {
        try {
            const agendamento = agendamentos_1.agendamentosMock.find((a) => a.id === id);
            return agendamento || null;
        }
        catch (error) {
            throw new Error(`Erro ao buscar agendamento por ID: ${error}`);
        }
    }
    async cancelarAgendamento(id) {
        try {
            const agendamento = agendamentos_1.agendamentosMock.find((a) => a.id === id);
            if (!agendamento) {
                return false;
            }
            agendamento.status = 'cancelado';
            return true;
        }
        catch (error) {
            throw new Error(`Erro ao cancelar agendamento: ${error}`);
        }
    }
}
exports.AgendamentoService = AgendamentoService;
//# sourceMappingURL=AgendamentoService.js.map