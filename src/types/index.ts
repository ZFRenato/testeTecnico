export interface Medico {
  id: string;
  nome: string;
  especialidade: string;
  crm: string;
}

export interface Horario {
  id: string;
  hora: string;
  disponivel: boolean;
}

export interface Agenda {
  id: string;
  medico: Medico;
  data: string;
  horarios: Horario[];
}

export interface Agendamento {
  id: string;
  medico: string;
  paciente: string;
  data_horario: string;
  status: 'confirmado' | 'pendente' | 'cancelado';
  data_criacao: string;
}

export interface AgendamentoRequest {
  agendamento: {
    medico: string;
    paciente: string;
    data_horario: string;
  };
}

export interface AgendamentoSimplificado {
  medico: string;
  paciente: string;
  data_horario: string;
}

export interface AgendamentoResponse {
  mensagem: string;
  agendamento: AgendamentoSimplificado;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string | undefined;
}

export interface LambdaEvent {
  httpMethod: string;
  path: string;
  headers: Record<string, string>;
  queryStringParameters: Record<string, string> | null;
  body: string | null;
}

export interface LambdaContext {
  functionName: string;
  functionVersion: string;
  invokedFunctionArn: string;
  memoryLimitInMB: string;
  awsRequestId: string;
  logGroupName: string;
  logStreamName: string;
  callbackWaitsForEmptyEventLoop: boolean;
  getRemainingTimeInMillis(): number;
  done(error?: Error, result?: any): void;
  fail(error: Error | string): void;
  succeed(message: any): void;
}

export interface MedicoComHorarios {
  id: string;
  nome: string;
  especialidade: string;
  horarios_disponiveis: string[];
}

export interface AgendasResponse {
  medicos: MedicoComHorarios[];
} 