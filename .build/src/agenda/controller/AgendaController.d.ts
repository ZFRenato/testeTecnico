import { LambdaEvent, LambdaContext } from '../../types';
import { IAgendaService } from '../interfaces/IAgendaService';
export declare class AgendaController {
    private agendaService;
    constructor(agendaService: IAgendaService);
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
//# sourceMappingURL=AgendaController.d.ts.map