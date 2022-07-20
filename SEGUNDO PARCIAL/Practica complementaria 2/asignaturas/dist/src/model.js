"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignatura = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const AsignaturaSchema = new Schema({
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
});
const Asignatura = mongoose_1.default.model('Asignaturas', AsignaturaSchema);
exports.Asignatura = Asignatura;
