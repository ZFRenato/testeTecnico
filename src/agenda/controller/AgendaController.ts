import { LambdaEvent, LambdaContext } from '../../types';
import { IAgendaService } from '../interfaces/IAgendaService';
import { ResponseUtil } from '../../utils/response';
import { ValidationUtil } from '../../utils/validation';

export class AgendaController {
  constructor(private agendaService: IAgendaService) {}

  async handler(event: LambdaEvent, _context: LambdaContext) {
    try {
      // Validar query parameters
      const queryParams = event.queryStringParameters || {};
      const validation = ValidationUtil.validateAgendaQuery(queryParams);

      if (validation.error) {
        return ResponseUtil.badRequest(validation.error);
      }

      const { medico, data } = validation.value || {};

      // Buscar agendas no novo formato
      const agendas = await this.agendaService.buscarAgendasFormatadas(medico, data);

      return ResponseUtil.ok(agendas, 'Agendas encontradas com sucesso');
    } catch (error) {
      console.error('Erro no controller de agenda:', error);
      return ResponseUtil.internalServerError('Erro interno do servidor');
    }
  }
} 