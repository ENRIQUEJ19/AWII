"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetalleHora = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const DetailSchema = new Schema({
    dia: {
        type: String,
        required: [true, 'Debe especificar el día de semana que recibe esta hora de clases']
    },
    horaInicio: {
        type: String,
        required: [true, 'Debe especificar la hora de inicio']
    },
    horaFin: {
        type: String,
        required: [true, 'Debe especificar la hora de fin']
    },
    estudiante: {
        type: String,
        required: [true, 'Especifique su nombre de usuario']
    },
    asignatura: {
        type: String,
        required: [true, 'Debe especificar la asignatura']
    },
    docente: {
        type: String,
        required: [true, 'Debe espeficicar el docente que imparte la asignatura']
    },
    nivel: {
        type: Number,
        required: [true, 'Debe especificar el nivel al cual pertenece la asignatura']
    },
    aula: {
        type: Number,
        required: [true, 'Debe especificar el aula donde se imparte la asignatura']
    },
    paralelo: {
        type: String,
        required: [true, 'Debe especificar en cual paralelo recibe esta asignatura']
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    }
});
const DetalleHora = mongoose_1.default.model('detalleHora', DetailSchema);
exports.DetalleHora = DetalleHora;
