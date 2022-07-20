import mongoose from "mongoose";
import { IDetalleHora } from './IDetalleHora';
const { Schema, model } = mongoose;

const DetailSchema: mongoose.Schema = new Schema<IDetalleHora>(
    {
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
    }
)

const DetalleHora = mongoose.model<IDetalleHora>('detalleHora', DetailSchema);

export { DetalleHora };