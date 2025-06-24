import { LambdaEvent, LambdaContext, AgendamentoResponse } from '../../types';
import { IAgendamentoService } from '../interfaces/IAgendamentoService';
import { ResponseUtil } from '../../utils/response';
import { ValidationUtil } from '../../utils/validation';

export class AgendamentoController {
  constructor(private agendamentoService: IAgendamentoService) {}

  async handler(event: LambdaEvent, _context: LambdaContext) {
    try {
      // Validar body da requisição
      if (!event.body) {
        return ResponseUtil.badRequest('Body da requisição é obrigatório');
      }

      const body = JSON.parse(event.body);
      const validation = ValidationUtil.validateAgendamento(body);

      if (validation.error) {
        return ResponseUtil.badRequest(validation.error);
      }

      if (!validation.value) {
        return ResponseUtil.badRequest('Dados de agendamento inválidos');
      }

      // Criar agendamento
      const agendamento = await this.agendamentoService.criarAgendamento(
        validation.value
      );

      // Formatar resposta conforme especificação
      const response: AgendamentoResponse = {
        mensagem: 'Agendamento realizado com sucesso',
        agendamento: {
          medico: agendamento.medico,
          paciente: agendamento.paciente,
          data_horario: agendamento.data_horario,
        },
      };

      return ResponseUtil.created(response, 'Agendamento criado com sucesso');
    } catch (error) {
      console.error('Erro no controller de agendamento:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('Data e hora devem ser futuras')) {
          return ResponseUtil.badRequest(error.message);
        }
        if (error.message.includes('Horário já está ocupado')) {
          return ResponseUtil.badRequest(error.message);
        }
      }
      
      return ResponseUtil.internalServerError('Erro interno do servidor');
    }
  }
} 