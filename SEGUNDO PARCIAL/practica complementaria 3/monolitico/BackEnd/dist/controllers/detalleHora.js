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
exports.borrarHora = exports.actualizarHora = exports.agregarHora = exports.obtenerHora = exports.obtenerHoras = void 0;
const models_1 = require("../models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const obtenerHoras = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('auth-token');
    const { id } = jsonwebtoken_1.default.decode(String(token));
    const query = { $and: [
            { estado: true },
            { registro: id }
        ] };
    try {
        const DetalleHoras = yield models_1.DetalleHora.find(query);
        res.json(DetalleHoras);
    }
    catch (error) {
        console.error(error);
    }
});
exports.obtenerHoras = obtenerHoras;
const obtenerHora = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const hora = yield models_1.DetalleHora.findById(id);
    res.json(hora);
});
exports.obtenerHora = obtenerHora;
const agregarHora = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { estado } = _a, body = __rest(_a, ["estado"]);
    const token = req.header('auth-token');
    const { id } = jsonwebtoken_1.default.decode(String(token));
    const existeHora = yield models_1.DetalleHora.findOne({ $and: [
            { dia: body.dia },
            { horaInicio: body.horaInicio },
            { horaFin: body.horaFin },
            { registro: id }
        ] });
    if (existeHora) {
        return res.status(400).json({
            message: `La hora registrada con inicio a las ${body.horaInicio} y fin a las ${body.horaFin} el d??a ${body.dia} ya se encuentra agregado`
        });
    }
    body.registro = id;
    const hora = new models_1.DetalleHora(body);
    const HoraNueva = yield hora.save();
    return res.status(201).json(HoraNueva);
});
exports.agregarHora = agregarHora;
const actualizarHora = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _b = req.body, { estado } = _b, body = __rest(_b, ["estado"]);
    const HoraModificada = yield models_1.DetalleHora.findByIdAndUpdate(id, body, { new: true });
    if (!HoraModificada)
        res.status(404).send({ message: "Hora no registrada" });
    res.json(HoraModificada);
});
exports.actualizarHora = actualizarHora;
const borrarHora = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const HoraEliminada = yield models_1.DetalleHora.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(HoraEliminada);
});
exports.borrarHora = borrarHora;
