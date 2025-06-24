import { AgendamentoService } from '../AgendamentoService';
import { AgendamentoRequest } from '../../../types';

describe('AgendamentoService', () => {
  let agendamentoService: AgendamentoService;
  let dataFutura: string;

  beforeEach(() => {
    agendamentoService = new AgendamentoService();
    const data = new Date();
    data.setDate(data.getDate() + 1);
    dataFutura = data.toISOString().slice(0, 10) + ' 09:00';
  });

  describe('criarAgendamento', () => {
    it('deve criar agendamento com dados válidos', async () => {
      const dados: AgendamentoRequest = {
        agendamento: {
          medico: 'Dr. João Silva',
          paciente: 'Carlos Almeida',
          data_horario: dataFutura,
        },
      };

      const agendamento = await agendamentoService.criarAgendamento(dados);

      expect(agendamento).toBeDefined();
      expect(agendamento.medico).toBe(dados.agendamento.medico);
      expect(agendamento.paciente).toBe(dados.agendamento.paciente);
      expect(agendamento.data_horario).toBe(dados.agendamento.data_horario);
      expect(agendamento.status).toBe('confirmado');
      expect(agendamento.id).toBeDefined();
      expect(agendamento.data_criacao).toBeDefined();
    });

    it('deve lançar erro para data/hora no passado', async () => {
      const dados: AgendamentoRequest = {
        agendamento: {
          medico: 'Dr. João Silva',
          paciente: 'Carlos Almeida',
          data_horario: '2020-01-01 09:00',
        },
      };

      await expect(agendamentoService.criarAgendamento(dados)).rejects.toThrow(
        'Data e hora devem ser futuras'
      );
    });

    it('deve lançar erro para horário já ocupado', async () => {
      // Primeiro agendamento
      const dados1: AgendamentoRequest = {
        agendamento: {
          medico: 'Dr. Pedro Lima',
          paciente: 'Carlos Almeida',
          data_horario: dataFutura,
        },
      };

      await agendamentoService.criarAgendamento(dados1);

      // Segundo agendamento no mesmo horário
      const dados2: AgendamentoRequest = {
        agendamento: {
          medico: 'Dr. Pedro Lima',
          paciente: 'Maria Silva',
          data_horario: dataFutura,
        },
      };

      await expect(agendamentoService.criarAgendamento(dados2)).rejects.toThrow(
        'Horário já está ocupado para este médico'
      );
    });
  });

  describe('buscarAgendamentos', () => {
    it('deve retornar lista de agendamentos', async () => {
      const agendamentos = await agendamentoService.buscarAgendamentos();
      expect(Array.isArray(agendamentos)).toBe(true);
    });
  });

  describe('buscarAgendamentoPorId', () => {
    it('deve retornar agendamento quando ID existe', async () => {
      const agendamento = await agendamentoService.buscarAgendamentoPorId('1');
      expect(agendamento).toBeDefined();
      expect(agendamento?.id).toBe('1');
    });

    it('deve retornar null quando ID não existe', async () => {
      const agendamento = await agendamentoService.buscarAgendamentoPorId('999');
      expect(agendamento).toBeNull();
    });
  });

  describe('cancelarAgendamento', () => {
    it('deve cancelar agendamento existente', async () => {
      const resultado = await agendamentoService.cancelarAgendamento('1');
      expect(resultado).toBe(true);

      const agendamento = await agendamentoService.buscarAgendamentoPorId('1');
      expect(agendamento?.status).toBe('cancelado');
    });

    it('deve retornar false para agendamento inexistente', async () => {
      const resultado = await agendamentoService.cancelarAgendamento('999');
      expect(resultado).toBe(false);
    });
  });
}); 