"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrarAsignatura = exports.actualizarAsignatura = exports.crearAsignatura = exports.obtenerAsignatura = exports.obtenerAsignaturas = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../models");
const obtenerAsignaturas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('auth-token');
    const { id } = jsonwebtoken_1.default.decode(String(token));
    const query = { $and: [
            { estado: true },
            { user: id }
        ] };
    try {
        const asignaturas = yield models_1.Asignatura.find(query);
        res.json(asignaturas);
    }
    catch (error) {
        console.error(error);
    }
});
exports.obtenerAsignaturas = obtenerAsignaturas;
const obtenerAsignatura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const asignatura = yield models_1.Asignatura.findById(id);
    res.json(asignatura);
});
exports.obtenerAsignatura = obtenerAsignatura;
const crearAsignatura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { estado } = _a, body = __rest(_a, ["estado"]);
    const token = req.header('auth-token');
    const { id } = jsonwebtoken_1.default.decode(String(token));
    const existeAsignatura = yield models_1.Asignatura.findOne({ $and: [
            { codigo: body.codigo },
            { user: id }
        ] });
    if (existeAsignatura) {
        return res.status(400).send({
            message: `La asignatura con ese codigo ${body.codigo} ya se encuentra registrada`
        });
    }
    body.user = id;
    const asignatura = new models_1.Asignatura(body);
    const AsignaturaNuevo = yield asignatura.save();
    return res.status(201).json(AsignaturaNuevo);
});
exports.crearAsignatura = crearAsignatura;
const actualizarAsignatura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _b = req.body, { estado } = _b, body = __rest(_b, ["estado"]);
    const AsignaturaModificado = yield models_1.Asignatura.findByIdAndUpdate(id, body, { new: true });
    if (!AsignaturaModificado)
        res.status(404).send({ message: "Asignatura no encontrado" });
    res.json(AsignaturaModificado);
});
exports.actualizarAsignatura = actualizarAsignatura;
const borrarAsignatura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const AsignaturaEliminada = yield models_1.Asignatura.findByIdAndDelete(id);
    res.json(AsignaturaEliminada);
});
exports.borrarAsignatura = borrarAsignatura;
