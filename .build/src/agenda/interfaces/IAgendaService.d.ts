import { Agenda } from '../../types';
export interface IAgendaService {
    buscarAgendas(medico?: string, data?: string): Promise<Agenda[]>;
    buscarAgendaPorId(id: string): Promise<Agenda | null>;
    verificarDisponibilidade(medico: string, data: string, hora: string): Promise<boolean>;
}
//# sourceMappingURL=IAgendaService.d.ts.map