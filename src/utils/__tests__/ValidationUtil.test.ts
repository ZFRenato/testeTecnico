import { ValidationUtil } from '../validation';
import { AgendamentoRequest } from '../../types';

describe('ValidationUtil', () => {
  describe('validateAgendamento', () => {
    it('deve validar dados corretos', () => {
      const dados: AgendamentoRequest = {
        agendamento: {
          medico: 'Dr. João Silva',
          paciente: 'Carlos Almeida',
          data_horario: '2024-12-25 09:00',
        },
      };

      const result = ValidationUtil.validateAgendamento(dados);
      expect(result.error).toBeUndefined();
      expect(result.value).toEqual(dados);
    });

    it('deve rejeitar médico vazio', () => {
      const dados = {
        agendamento: {
          medico: '',
          paciente: 'Carlos Almeida',
          data_horario: '2024-12-25 09:00',
        },
      };

      const result = ValidationUtil.validateAgendamento(dados);
      expect(result.error).toBeDefined();
      expect(result.value).toBeUndefined();
    });

    it('deve rejeitar paciente vazio', () => {
      const dados = {
        agendamento: {
          medico: 'Dr. João Silva',
          paciente: '',
          data_horario: '2024-12-25 09:00',
        },
      };

      const result = ValidationUtil.validateAgendamento(dados);
      expect(result.error).toBeDefined();
      expect(result.value).toBeUndefined();
    });

    it('deve rejeitar formato de data/hora inválido', () => {
      const dados = {
        agendamento: {
          medico: 'Dr. João Silva',
          paciente: 'Carlos Almeida',
          data_horario: '2024/12/25 09:00',
        },
      };

      const result = ValidationUtil.validateAgendamento(dados);
      expect(result.error).toBeDefined();
      expect(result.value).toBeUndefined();
    });

    it('deve rejeitar data/hora ausente', () => {
      const dados = {
        agendamento: {
          medico: 'Dr. João Silva',
          paciente: 'Carlos Almeida',
        },
      };

      const result = ValidationUtil.validateAgendamento(dados);
      expect(result.error).toBeDefined();
      expect(result.value).toBeUndefined();
    });
  });

  describe('validateAgendaQuery', () => {
    it('deve validar query vazia', () => {
      const result = ValidationUtil.validateAgendaQuery({});
      expect(result.error).toBeUndefined();
      expect(result.value).toEqual({});
    });

    it('deve validar médico válido', () => {
      const query = { medico: 'Dr. João Silva' };
      const result = ValidationUtil.validateAgendaQuery(query);
      expect(result.error).toBeUndefined();
      expect(result.value).toEqual(query);
    });

    it('deve validar data válida', () => {
      const query = { data: '2024-12-25' };
      const result = ValidationUtil.validateAgendaQuery(query);
      expect(result.error).toBeUndefined();
      expect(result.value).toEqual(query);
    });

    it('deve rejeitar formato de data inválido', () => {
      const query = { data: '2024/12/25' };
      const result = ValidationUtil.validateAgendaQuery(query);
      expect(result.error).toBeDefined();
      expect(result.value).toBeUndefined();
    });

    it('deve validar médico e data juntos', () => {
      const query = { medico: 'Dr. João Silva', data: '2024-12-25' };
      const result = ValidationUtil.validateAgendaQuery(query);
      expect(result.error).toBeUndefined();
      expect(result.value).toEqual(query);
    });
  });

  describe('validateDateTime', () => {
    it('deve validar data/hora futura', () => {
      const dataFutura = new Date();
      dataFutura.setDate(dataFutura.getDate() + 1);
      const dataString = dataFutura.toISOString().slice(0, 16).replace('T', ' ');
      
      const result = ValidationUtil.validateDateTime(dataString);
      expect(result).toBe(true);
    });

    it('deve rejeitar data/hora no passado', () => {
      const dataPassado = '2020-01-01 09:00';
      const result = ValidationUtil.validateDateTime(dataPassado);
      expect(result).toBe(false);
    });

    it('deve rejeitar formato inválido', () => {
      const dataInvalida = 'data-invalida';
      const result = ValidationUtil.validateDateTime(dataInvalida);
      expect(result).toBe(false);
    });
  });

  describe('validateDate', () => {
    it('deve validar data válida', () => {
      const data = '2024-12-25';
      const result = ValidationUtil.validateDate(data);
      expect(result).toBe(true);
    });

    it('deve rejeitar formato inválido', () => {
      const data = '2024/12/25';
      const result = ValidationUtil.validateDate(data);
      expect(result).toBe(false);
    });

    it('deve rejeitar data inválida', () => {
      const data = 'data-invalida';
      const result = ValidationUtil.validateDate(data);
      expect(result).toBe(false);
    });
  });
}); 