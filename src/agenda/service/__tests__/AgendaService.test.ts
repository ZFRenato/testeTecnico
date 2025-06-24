import { AgendaService } from '../AgendaService';
import { medicosMock } from '../../mocks/medicos';
import { agendasMock } from '../../mocks/agendas';

describe('AgendaService', () => {
  let agendaService: AgendaService;

  beforeEach(() => {
    agendaService = new AgendaService();
  });

  describe('buscarAgendas', () => {
    it('deve retornar todas as agendas quando não há filtros', async () => {
      const agendas = await agendaService.buscarAgendas();
      expect(agendas).toHaveLength(agendasMock.length);
    });

    it('deve filtrar agendas por médico', async () => {
      const medico = 'Dr. João Silva';
      const agendas = await agendaService.buscarAgendas(medico);
      
      expect(agendas).toHaveLength(2); // Dr. João Silva tem 2 agendas
      agendas.forEach(agenda => {
        expect(agenda.medico.nome).toBe(medico);
      });
    });

    it('deve filtrar agendas por data', async () => {
      const data = '2024-10-05';
      const agendas = await agendaService.buscarAgendas(undefined, data);
      
      agendas.forEach(agenda => {
        expect(agenda.data).toBe(data);
      });
    });

    it('deve filtrar agendas por médico e data', async () => {
      const medico = 'Dr. João Silva';
      const data = '2024-10-05';
      const agendas = await agendaService.buscarAgendas(medico, data);
      
      expect(agendas).toHaveLength(1);
      expect(agendas[0].medico.nome).toBe(medico);
      expect(agendas[0].data).toBe(data);
    });

    it('deve retornar array vazio para médico inexistente', async () => {
      const medico = 'Dr. Inexistente';
      const agendas = await agendaService.buscarAgendas(medico);
      
      expect(agendas).toHaveLength(0);
    });
  });

  describe('buscarAgendaPorId', () => {
    it('deve retornar agenda quando ID existe', async () => {
      const agenda = await agendaService.buscarAgendaPorId('1');
      expect(agenda).toBeDefined();
      expect(agenda?.id).toBe('1');
    });

    it('deve retornar null quando ID não existe', async () => {
      const agenda = await agendaService.buscarAgendaPorId('999');
      expect(agenda).toBeNull();
    });
  });

  describe('verificarDisponibilidade', () => {
    it('deve retornar true para horário disponível', async () => {
      const disponivel = await agendaService.verificarDisponibilidade(
        'Dr. João Silva',
        '2024-10-05',
        '09:00'
      );
      expect(disponivel).toBe(true);
    });

    it('deve retornar false para horário ocupado', async () => {
      const disponivel = await agendaService.verificarDisponibilidade(
        'Dr. João Silva',
        '2024-10-06',
        '08:00'
      );
      expect(disponivel).toBe(false);
    });

    it('deve retornar false para médico inexistente', async () => {
      const disponivel = await agendaService.verificarDisponibilidade(
        'Dr. Inexistente',
        '2024-10-05',
        '09:00'
      );
      expect(disponivel).toBe(false);
    });

    it('deve retornar false para data inexistente', async () => {
      const disponivel = await agendaService.verificarDisponibilidade(
        'Dr. João Silva',
        '2024-12-31',
        '09:00'
      );
      expect(disponivel).toBe(false);
    });
  });
}); 