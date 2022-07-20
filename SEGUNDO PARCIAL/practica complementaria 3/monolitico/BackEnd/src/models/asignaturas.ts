import mongoose from 'mongoose';
import { IAsignatura } from '../interfaces';
const { Schema, model } = mongoose;


const AsignaturaSchema: mongoose.Schema = new Schema<IAsignatura>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "Usuario"
        },
        nombreMateria: {
            type: String,
            required: [true, 'El nombre de la asignatura es obligatorio']
        },
        codigo: {
            type: String,
            required: [true, 'El codigo de la asignatura es obligatorio']
        },
        creditos: {
            type: Number
        },
        valor: {
            type: String
        },
        estado: {
            type: Boolean,
            default: true,
            required: true
        }
        
    }
)

const Asignatura = mongoose.model<IAsignatura>('Asignaturas', AsignaturaSchema)

export { Asignatura };