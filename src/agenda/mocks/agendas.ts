import { Agenda, Horario } from '../../types';
import { medicosMock } from './medicos';

const horariosDisponiveis: Horario[] = [
  { id: '1', hora: '08:00', disponivel: true },
  { id: '2', hora: '09:00', disponivel: true },
  { id: '3', hora: '10:00', disponivel: true },
  { id: '4', hora: '11:00', disponivel: true },
  { id: '5', hora: '14:00', disponivel: true },
  { id: '6', hora: '15:00', disponivel: true },
  { id: '7', hora: '16:00', disponivel: true },
  { id: '8', hora: '17:00', disponivel: true },
];

const horariosOcupados: Horario[] = [
  { id: '1', hora: '08:00', disponivel: false },
  { id: '2', hora: '09:00', disponivel: true },
  { id: '3', hora: '10:00', disponivel: false },
  { id: '4', hora: '11:00', disponivel: true },
  { id: '5', hora: '14:00', disponivel: true },
  { id: '6', hora: '15:00', disponivel: false },
  { id: '7', hora: '16:00', disponivel: true },
  { id: '8', hora: '17:00', disponivel: true },
];

export const agendasMock: Agenda[] = [
  {
    id: '1',
    medico: medicosMock[0]!, // Dr. João Silva
    data: '2024-10-05',
    horarios: horariosDisponiveis,
  },
  {
    id: '2',
    medico: medicosMock[0]!, // Dr. João Silva
    data: '2024-10-06',
    horarios: horariosOcupados,
  },
  {
    id: '3',
    medico: medicosMock[1]!, // Dra. Maria Santos
    data: '2024-10-05',
    horarios: horariosDisponiveis,
  },
  {
    id: '4',
    medico: medicosMock[1]!, // Dra. Maria Santos
    data: '2024-10-06',
    horarios: horariosDisponiveis,
  },
  {
    id: '5',
    medico: medicosMock[2]!, // Dr. Carlos Oliveira
    data: '2024-10-05',
    horarios: horariosOcupados,
  },
  {
    id: '6',
    medico: medicosMock[3]!, // Dra. Ana Costa
    data: '2024-10-05',
    horarios: horariosDisponiveis,
  },
  {
    id: '7',
    medico: medicosMock[4]!, // Dr. Pedro Lima
    data: '2024-10-05',
    horarios: horariosDisponiveis,
  },
]; 