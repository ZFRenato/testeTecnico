"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agendasMock = void 0;
const medicos_1 = require("./medicos");
const horariosDisponiveis = [
    { id: '1', hora: '08:00', disponivel: true },
    { id: '2', hora: '09:00', disponivel: true },
    { id: '3', hora: '10:00', disponivel: true },
    { id: '4', hora: '11:00', disponivel: true },
    { id: '5', hora: '14:00', disponivel: true },
    { id: '6', hora: '15:00', disponivel: true },
    { id: '7', hora: '16:00', disponivel: true },
    { id: '8', hora: '17:00', disponivel: true },
];
const horariosOcupados = [
    { id: '1', hora: '08:00', disponivel: false },
    { id: '2', hora: '09:00', disponivel: true },
    { id: '3', hora: '10:00', disponivel: false },
    { id: '4', hora: '11:00', disponivel: true },
    { id: '5', hora: '14:00', disponivel: true },
    { id: '6', hora: '15:00', disponivel: false },
    { id: '7', hora: '16:00', disponivel: true },
    { id: '8', hora: '17:00', disponivel: true },
];
exports.agendasMock = [
    {
        id: '1',
        medico: medicos_1.medicosMock[0],
        data: '2024-10-05',
        horarios: horariosDisponiveis,
    },
    {
        id: '2',
        medico: medicos_1.medicosMock[0],
        data: '2024-10-06',
        horarios: horariosOcupados,
    },
    {
        id: '3',
        medico: medicos_1.medicosMock[1],
        data: '2024-10-05',
        horarios: horariosDisponiveis,
    },
    {
        id: '4',
        medico: medicos_1.medicosMock[1],
        data: '2024-10-06',
        horarios: horariosDisponiveis,
    },
    {
        id: '5',
        medico: medicos_1.medicosMock[2],
        data: '2024-10-05',
        horarios: horariosOcupados,
    },
    {
        id: '6',
        medico: medicos_1.medicosMock[3],
        data: '2024-10-05',
        horarios: horariosDisponiveis,
    },
    {
        id: '7',
        medico: medicos_1.medicosMock[4],
        data: '2024-10-05',
        horarios: horariosDisponiveis,
    },
];
//# sourceMappingURL=agendas.js.map