"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgendaService = void 0;
const agendas_1 = require("../mocks/agendas");
const medicos_1 = require("../mocks/medicos");
class AgendaService {
    async buscarAgendas(medico, data) {
        try {
            let agendas = [...agendas_1.agendasMock];
            if (medico) {
                const medicoEncontrado = medicos_1.medicosMock.find((m) => m.nome.toLowerCase().includes(medico.toLowerCase()));
                if (medicoEncontrado) {
                    agendas = agendas.filter((agenda) => agenda.medico.id === medicoEncontrado.id);
                }
                else {
                    return [];
                }
            }
            if (data) {
                agendas = agendas.filter((agenda) => agenda.data === data);
            }
            return agendas;
        }
        catch (error) {
            throw new Error(`Erro ao buscar agendas: ${error}`);
        }
    }
    async buscarAgendaPorId(id) {
        try {
            const agenda = agendas_1.agendasMock.find((a) => a.id === id);
            return agenda || null;
        }
        catch (error) {
            throw new Error(`Erro ao buscar agenda por ID: ${error}`);
        }
    }
    async verificarDisponibilidade(medico, data, hora) {
        try {
            const medicoEncontrado = medicos_1.medicosMock.find((m) => m.nome.toLowerCase().includes(medico.toLowerCase()));
            if (!medicoEncontrado) {
                return false;
            }
            const agenda = agendas_1.agendasMock.find((a) => a.medico.id === medicoEncontrado.id && a.data === data);
            if (!agenda) {
                return false;
            }
            const horario = agenda.horarios.find((h) => h.hora === hora);
            return horario ? horario.disponivel : false;
        }
        catch (error) {
            throw new Error(`Erro ao verificar disponibilidade: ${error}`);
        }
    }
}
exports.AgendaService = AgendaService;
//# sourceMappingURL=AgendaService.js.map