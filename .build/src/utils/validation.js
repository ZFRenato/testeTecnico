"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationUtil = void 0;
const joi_1 = __importDefault(require("joi"));
class ValidationUtil {
    static validateAgendamento(data) {
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
    static validateAgendaQuery(query) {
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
    static validateDateTime(dateTime) {
        const date = new Date(dateTime);
        return !isNaN(date.getTime()) && date > new Date();
    }
    static validateDate(date) {
        const dateObj = new Date(date);
        return !isNaN(dateObj.getTime());
    }
}
exports.ValidationUtil = ValidationUtil;
ValidationUtil.agendamentoSchema = joi_1.default.object({
    agendamento: joi_1.default.object({
        medico: joi_1.default.string().required().min(3).max(100),
        paciente: joi_1.default.string().required().min(3).max(100),
        data_horario: joi_1.default.string()
            .required()
            .pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/)
            .message('data_horario deve estar no formato YYYY-MM-DD HH:MM'),
    }).required(),
});
ValidationUtil.agendaQuerySchema = joi_1.default.object({
    medico: joi_1.default.string().optional().min(3).max(100),
    data: joi_1.default.string()
        .optional()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .message('data deve estar no formato YYYY-MM-DD'),
});
//# sourceMappingURL=validation.js.map