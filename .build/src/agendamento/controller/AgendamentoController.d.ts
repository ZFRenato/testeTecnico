import { LambdaEvent, LambdaContext } from '../../types';
import { IAgendamentoService } from '../interfaces/IAgendamentoService';
export declare class AgendamentoController {
    private agendamentoService;
    constructor(agendamentoService: IAgendamentoService);
    handler(event: LambdaEvent, context: LambdaContext): Promise<{
        statusCode: number;
        headers: {
            'Content-Type': string;
            'Access-Control-Allow-Origin': string;
            'Access-Control-Allow-Credentials': boolean;
        };
        body: string;
    }>;
}
//# sourceMappingURL=AgendamentoController.d.ts.map