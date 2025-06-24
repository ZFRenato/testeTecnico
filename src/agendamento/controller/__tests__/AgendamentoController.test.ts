import { AgendamentoController } from '../AgendamentoController';
import { AgendamentoService } from '../../service/AgendamentoService';
import { LambdaEvent, LambdaContext } from '../../../types';

// Mock do AgendamentoService
jest.mock('../../service/AgendamentoService');

describe('AgendamentoController', () => {
  let agendamentoController: AgendamentoController;
  let mockAgendamentoService: jest.Mocked<AgendamentoService>;

  beforeEach(() => {
    mockAgendamentoService = new AgendamentoService() as jest.Mocked<AgendamentoService>;
    agendamentoController = new AgendamentoController(mockAgendamentoService);
  });

  describe('handler', () => {
    it('deve criar agendamento e retornar formato simplificado', async () => {
      // Mock do agendamento retornado pelo serviço
      const mockAgendamento = {
        id: '5',
        medico: 'Dr. João Silva',
        paciente: 'Carlos Almeida',
        data_horario: '2024-10-05 09:00',
        status: 'confirmado' as const,
        data_criacao: '2024-09-25T10:30:00.000Z',
      };

      mockAgendamentoService.criarAgendamento = jest.fn().mockResolvedValue(mockAgendamento);

      const event: LambdaEvent = {
        httpMethod: 'POST',
        path: '/agendamento',
        headers: { 'Content-Type': 'application/json' },
        queryStringParameters: null,
        body: JSON.stringify({
          agendamento: {
            medico: 'Dr. João Silva',
            paciente: 'Carlos Almeida',
            data_horario: '2024-10-05 09:00',
          },
        }),
      };

      const context: LambdaContext = {
        functionName: 'test',
        functionVersion: '1',
        invokedFunctionArn: 'test',
        memoryLimitInMB: '128',
        awsRequestId: 'test',
        logGroupName: 'test',
        logStreamName: 'test',
        callbackWaitsForEmptyEventLoop: true,
        getRemainingTimeInMillis: () => 1000,
        done: jest.fn(),
        fail: jest.fn(),
        succeed: jest.fn(),
      };

      const response = await agendamentoController.handler(event, context);

      expect(response.statusCode).toBe(201);
      
      const responseBody = JSON.parse(response.body);
      expect(responseBody.success).toBe(true);
      expect(responseBody.data.mensagem).toBe('Agendamento realizado com sucesso');
      expect(responseBody.data.agendamento).toEqual({
        medico: 'Dr. João Silva',
        paciente: 'Carlos Almeida',
        data_horario: '2024-10-05 09:00',
      });
      
      // Verificar que os campos extras não estão presentes
      expect(responseBody.data.agendamento.id).toBeUndefined();
      expect(responseBody.data.agendamento.status).toBeUndefined();
      expect(responseBody.data.agendamento.data_criacao).toBeUndefined();
    });

    it('deve retornar erro 400 para body inválido', async () => {
      const event: LambdaEvent = {
        httpMethod: 'POST',
        path: '/agendamento',
        headers: { 'Content-Type': 'application/json' },
        queryStringParameters: null,
        body: null,
      };

      const context: LambdaContext = {
        functionName: 'test',
        functionVersion: '1',
        invokedFunctionArn: 'test',
        memoryLimitInMB: '128',
        awsRequestId: 'test',
        logGroupName: 'test',
        logStreamName: 'test',
        callbackWaitsForEmptyEventLoop: true,
        getRemainingTimeInMillis: () => 1000,
        done: jest.fn(),
        fail: jest.fn(),
        succeed: jest.fn(),
      };

      const response = await agendamentoController.handler(event, context);

      expect(response.statusCode).toBe(400);
      
      const responseBody = JSON.parse(response.body);
      expect(responseBody.success).toBe(false);
      expect(responseBody.error).toBe('Body da requisição é obrigatório');
    });
  });
}); 