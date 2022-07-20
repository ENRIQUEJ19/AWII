import mongoose from "mongoose";
import { IRegistro } from "../interfaces";
const { Schema, model } = mongoose;

const RegistroSchema: mongoose.Schema = new Schema<IRegistro>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "Usuario"
        },
        periodo: {
            type: String,
            required: true
        },
        totalHoras: {
            type: Number,
            required: true
        },
        docentes: [{
            nombre_docente: {
                type: String,
                required: true,
            },
            apellido: {
                type: String,
                required: true
            }
        }],
        asignaturas: [{
            nombre_asignatura: {
                type: String,
                required: true,
            }  
        }],
        nivel: {
            type: Number,
            required: true
        },
        estado: {
            type: Boolean,
            required: true,
            default: true
        }
    }
)

const Registro  = mongoose.model<IRegistro>('Registro', RegistroSchema);
export {Registro};