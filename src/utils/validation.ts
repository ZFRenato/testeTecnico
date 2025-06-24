import Joi from 'joi';
import { AgendamentoRequest } from '../types';

export class ValidationUtil {
  private static agendamentoSchema = Joi.object({
    agendamento: Joi.object({
      medico: Joi.string().required().min(3).max(100),
      paciente: Joi.string().required().min(3).max(100),
      data_horario: Joi.string()
        .required()
        .pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/)
        .message('data_horario deve estar no formato YYYY-MM-DD HH:MM'),
    }).required(),
  });

  private static agendaQuerySchema = Joi.object({
    medico: Joi.string().optional().min(3).max(100),
    data: Joi.string()
      .optional()
      .pattern(/^\d{4}-\d{2}-\d{2}$/)
      .message('data deve estar no formato YYYY-MM-DD'),
  });

  static validateAgendamento(data: any): { error?: string; value?: AgendamentoRequest } {
    const { error, value } = this.agendamentoSchema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(', ');
      return { error: errorMessage };
    }

    return { value };
  }

  static validateAgendaQuery(query: any): { error?: string; value?: any } {
    const { error, value } = this.agendaQuerySchema.validate(query, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(', ');
      return { error: errorMessage };
    }

    return { value };
  }

  static validateDateTime(dateTime: string): boolean {
    const date = new Date(dateTime);
    return !isNaN(date.getTime()) && date > new Date();
  }

  static validateDate(date: string): boolean {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return false;
    }
    const dateObj = new Date(date);
    return !isNaN(dateObj.getTime());
  }
} 