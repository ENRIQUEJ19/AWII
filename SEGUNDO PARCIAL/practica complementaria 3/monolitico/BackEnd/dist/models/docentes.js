"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Docentes = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const DocenteSchema = new Schema({
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
});
const Docentes = mongoose_1.default.model('docente', DocenteSchema);
exports.Docentes = Docentes;
