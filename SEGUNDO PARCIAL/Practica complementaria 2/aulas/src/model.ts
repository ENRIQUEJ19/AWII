import mongoose from 'mongoose'
import { IAula } from './IAulas'
const { Schema, model } = mongoose;

const AulaSchema: mongoose.Schema = new Schema<IAula>({

    /* curso:{
        codigo : '101',
        nombre : 'aula de clases || laboratorio',
        piso : 1
    } */

    numeroDeAula: {
        type: Number,
        required: [true, 'El número del aula es obligatorio']
    },
    tipo: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    piso: {
        type: Number,
        required: [true, 'El piso es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    }
})


const Aula = mongoose.model<IAula>('Aula', AulaSchema)
export { Aula }