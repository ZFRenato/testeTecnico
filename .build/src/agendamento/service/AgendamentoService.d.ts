import { Agendamento, AgendamentoRequest } from '../../types';
import { IAgendamentoService } from '../interfaces/IAgendamentoService';
export declare class AgendamentoService implements IAgendamentoService {
    criarAgendamento(dados: AgendamentoRequest): Promise<Agendamento>;
    buscarAgendamentos(): Promise<Agendamento[]>;
    buscarAgendamentoPorId(id: string): Promise<Agendamento | null>;
    cancelarAgendamento(id: string): Promise<boolean>;
}
//# sourceMappingURL=AgendamentoService.d.ts.map