import { Agenda, AgendasResponse, MedicoComHorarios } from '../../types';
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

  async buscarAgendasFormatadas(medico?: string, data?: string): Promise<AgendasResponse> {
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
          return { medicos: [] };
        }
      }

      // Filtrar por data se especificada
      if (data) {
        agendas = agendas.filter((agenda) => agenda.data === data);
      }

      // Agrupar por médico
      const medicosMap = new Map<string, MedicoComHorarios>();

      agendas.forEach((agenda) => {
        const medicoId = agenda.medico.id;
        
        if (!medicosMap.has(medicoId)) {
          medicosMap.set(medicoId, {
            id: agenda.medico.id,
            nome: agenda.medico.nome,
            especialidade: agenda.medico.especialidade,
            horarios_disponiveis: []
          });
        }

        const medicoComHorarios = medicosMap.get(medicoId)!;
        
        // Adicionar horários disponíveis para esta data
        agenda.horarios
          .filter((horario) => horario.disponivel)
          .forEach((horario) => {
            const horarioCompleto = `${agenda.data} ${horario.hora}`;
            if (!medicoComHorarios.horarios_disponiveis.includes(horarioCompleto)) {
              medicoComHorarios.horarios_disponiveis.push(horarioCompleto);
            }
          });
      });

      return {
        medicos: Array.from(medicosMap.values())
      };
    } catch (error) {
      throw new Error(`Erro ao buscar agendas formatadas: ${error}`);
    }
  }
} 