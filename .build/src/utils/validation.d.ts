import { AgendamentoRequest } from '../types';
export declare class ValidationUtil {
    private static agendamentoSchema;
    private static agendaQuerySchema;
    static validateAgendamento(data: any): {
        error?: string;
        value?: AgendamentoRequest;
    };
    static validateAgendaQuery(query: any): {
        error?: string;
        value?: any;
    };
    static validateDateTime(dateTime: string): boolean;
    static validateDate(date: string): boolean;
}
//# sourceMappingURL=validation.d.ts.map