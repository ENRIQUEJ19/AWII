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
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrarAula = exports.actualizarAula = exports.crearAula = exports.consultarAula = exports.consultarAulas = void 0;
const model_1 = require("./model");
const consultarAulas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { estado: true };
    try {
        const aulas = yield model_1.Aula.find(query);
        res.json(aulas);
    }
    catch (error) {
        console.error(error);
    }
});
exports.consultarAulas = consultarAulas;
const consultarAula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const aula = yield model_1.Aula.findById(id);
    res.json(aula);
});
exports.consultarAula = consultarAula;
const crearAula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { estado } = _a, body = __rest(_a, ["estado"]);
    const existeAula = yield model_1.Aula.findOne({ $or: [
            { numeroDeAula: body.numeroDeAula }
        ] });
    if (existeAula) {
        return res.status(400).send({
            message: `El aula con el número ${body.numeroDeAula} ya se encuentra registrada`
        });
    }
    const aula = new model_1.Aula(body);
    const AulaNuevo = yield aula.save();
    return res.status(201).json(AulaNuevo);
});
exports.crearAula = crearAula;
const actualizarAula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _b = req.body, { estado } = _b, body = __rest(_b, ["estado"]);
    const AulaModificado = yield model_1.Aula.findByIdAndUpdate(id, body, { new: true });
    if (!AulaModificado)
        res.status(404).send({ message: "Aula no encontrada" });
    res.json(AulaModificado);
});
exports.actualizarAula = actualizarAula;
const borrarAula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const AulaEliminado = yield model_1.Aula.findByIdAndDelete(id);
    res.json(AulaEliminado);
});
exports.borrarAula = borrarAula;
