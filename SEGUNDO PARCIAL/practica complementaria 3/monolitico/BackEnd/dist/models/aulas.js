"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aula = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const AulaSchema = new Schema({
    /* curso:{
        codigo : '101',
        nombre : 'aula de clases || laboratorio',
        piso : 1
    } */
    user: {
        type: Schema.Types.ObjectId,
        ref: "Usuario"
    },
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
});
const Aula = mongoose_1.default.model('Aula', AulaSchema);
exports.Aula = Aula;
