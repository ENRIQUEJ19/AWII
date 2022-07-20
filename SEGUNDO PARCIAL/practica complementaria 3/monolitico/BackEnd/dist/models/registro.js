"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Registro = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const RegistroSchema = new Schema({
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
});
const Registro = mongoose_1.default.model('Registro', RegistroSchema);
exports.Registro = Registro;
