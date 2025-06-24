import { Agendamento, AgendamentoRequest } from '../../types';
import { IAgendamentoService } from '../interfaces/IAgendamentoService';
import { agendamentosMock } from '../mocks/agendamentos';
import { ValidationUtil } from '../../utils/validation';

export class AgendamentoService implements IAgendamentoService {
  async criarAgendamento(dados: AgendamentoRequest): Promise<Agendamento> {
    try {
      const { agendamento } = dados;

      // Validar se a data/hora é futura
      if (!ValidationUtil.validateDateTime(agendamento.data_horario)) {
        throw new Error('Data e hora devem ser futuras');
      }

      // Verificar se já existe agendamento para o mesmo médico no mesmo horário
      const agendamentoExistente = agendamentosMock.find(
        (a) =>
          a.medico === agendamento.medico &&
          a.data_horario === agendamento.data_horario &&
          a.status !== 'cancelado'
      );

      if (agendamentoExistente) {
        throw new Error('Horário já está ocupado para este médico');
      }

      // Criar novo agendamento
      const novoAgendamento: Agendamento = {
        id: (agendamentosMock.length + 1).toString(),
        medico: agendamento.medico,
        paciente: agendamento.paciente,
        data_horario: agendamento.data_horario,
        status: 'confirmado',
        data_criacao: new Date().toISOString(),
      };

      // Simular persistência (em um cenário real, seria salvo no banco)
      agendamentosMock.push(novoAgendamento);

      return novoAgendamento;
    } catch (error) {
      // Se já é um Error, re-throw sem encapsular
      if (error instanceof Error) {
        throw error;
      }
      // Se não é um Error, encapsular com mensagem genérica
      throw new Error(`Erro ao criar agendamento: ${error}`);
    }
  }

  async buscarAgendamentos(): Promise<Agendamento[]> {
    try {
      return [...agendamentosMock];
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Erro ao buscar agendamentos: ${error}`);
    }
  }

  async buscarAgendamentoPorId(id: string): Promise<Agendamento | null> {
    try {
      const agendamento = agendamentosMock.find((a) => a.id === id);
      return agendamento || null;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Erro ao buscar agendamento por ID: ${error}`);
    }
  }

  async cancelarAgendamento(id: string): Promise<boolean> {
    try {
      const agendamento = agendamentosMock.find((a) => a.id === id);
      if (!agendamento) {
        return false;
      }

      agendamento.status = 'cancelado';
      return true;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Erro ao cancelar agendamento: ${error}`);
    }
  }
} 