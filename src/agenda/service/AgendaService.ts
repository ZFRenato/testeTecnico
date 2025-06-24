import { Agenda } from '../../types';
import { IAgendaService } from '../interfaces/IAgendaService';
import { agendasMock } from '../mocks/agendas';
import { medicosMock } from '../mocks/medicos';

export class AgendaService implements IAgendaService {
  async buscarAgendas(medico?: string, data?: string): Promise<Agenda[]> {
    try {
      let agendas = [...agendasMock];

      // Filtrar por médico se especificado
      if (medico) {
        const medicoEncontrado = medicosMock.find(
          (m) => m.nome.toLowerCase().includes(medico.toLowerCase())
        );
        if (medicoEncontrado) {
          agendas = agendas.filter((agenda) => agenda.medico.id === medicoEncontrado.id);
        } else {
          return [];
        }
      }

      // Filtrar por data se especificada
      if (data) {
        agendas = agendas.filter((agenda) => agenda.data === data);
      }

      return agendas;
    } catch (error) {
      throw new Error(`Erro ao buscar agendas: ${error}`);
    }
  }

  async buscarAgendaPorId(id: string): Promise<Agenda | null> {
    try {
      const agenda = agendasMock.find((a) => a.id === id);
      return agenda || null;
    } catch (error) {
      throw new Error(`Erro ao buscar agenda por ID: ${error}`);
    }
  }

  async verificarDisponibilidade(
    medico: string,
    data: string,
    hora: string
  ): Promise<boolean> {
    try {
      const medicoEncontrado = medicosMock.find(
        (m) => m.nome.toLowerCase().includes(medico.toLowerCase())
      );

      if (!medicoEncontrado) {
        return false;
      }

      const agenda = agendasMock.find(
        (a) => a.medico.id === medicoEncontrado.id && a.data === data
      );

      if (!agenda) {
        return false;
      }

      const horario = agenda.horarios.find((h) => h.hora === hora);
      return horario ? horario.disponivel : false;
    } catch (error) {
      throw new Error(`Erro ao verificar disponibilidade: ${error}`);
    }
  }
} 