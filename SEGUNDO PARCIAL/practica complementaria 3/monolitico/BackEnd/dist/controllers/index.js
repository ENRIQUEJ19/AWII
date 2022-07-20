"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aula = exports.Asignatura = exports.Docentes = exports.Registro = exports.DetalleHora = void 0;
const DetalleHora = __importStar(require("./detalleHora"));
exports.DetalleHora = DetalleHora;
const Registro = __importStar(require("./registro"));
exports.Registro = Registro;
const Docentes = __importStar(require("./docentes"));
exports.Docentes = Docentes;
const Asignatura = __importStar(require("./asignaturas"));
exports.Asignatura = Asignatura;
const Aula = __importStar(require("./aulas"));
exports.Aula = Aula;
