import mongoose from 'mongoose'
import { IDocente } from '../interfaces'
const { Schema, model } = mongoose;

const DocenteSchema: mongoose.Schema = new Schema<IDocente>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "Usuario"
        },
        nombredocente: {
            type: String,
            required: [true, 'El nombre del docente es obligatorio']
        },
        apellidodocente: {
            type: String,
            required: [true, 'El apellido del docente es obligatorio']
        },
        email: {
            type: String,
        },
        estado: {
            type: Boolean,
            default: true,
            required: true
        },
        telefono: {
            type: String
        }
    }
)

const Docentes = mongoose.model<IDocente>('docente', DocenteSchema)

export { Docentes };