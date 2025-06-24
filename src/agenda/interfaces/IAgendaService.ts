import { Agenda, AgendasResponse } from '../../types';

export interface IAgendaService {
  buscarAgendas(medico?: string, data?: string): Promise<Agenda[]>;
  buscarAgendaPorId(id: string): Promise<Agenda | null>;
  verificarDisponibilidade(medico: string, data: string, hora: string): Promise<boolean>;
  buscarAgendasFormatadas(medico?: string, data?: string): Promise<AgendasResponse>;
} 