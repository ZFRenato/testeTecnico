import { Agenda } from '../../types';
import { IAgendaService } from '../interfaces/IAgendaService';
export declare class AgendaService implements IAgendaService {
    buscarAgendas(medico?: string, data?: string): Promise<Agenda[]>;
    buscarAgendaPorId(id: string): Promise<Agenda | null>;
    verificarDisponibilidade(medico: string, data: string, hora: string): Promise<boolean>;
}
//# sourceMappingURL=AgendaService.d.ts.map