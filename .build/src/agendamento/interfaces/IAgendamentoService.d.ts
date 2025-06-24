import { Agendamento, AgendamentoRequest } from '../../types';
export interface IAgendamentoService {
    criarAgendamento(dados: AgendamentoRequest): Promise<Agendamento>;
    buscarAgendamentos(): Promise<Agendamento[]>;
    buscarAgendamentoPorId(id: string): Promise<Agendamento | null>;
    cancelarAgendamento(id: string): Promise<boolean>;
}
//# sourceMappingURL=IAgendamentoService.d.ts.map