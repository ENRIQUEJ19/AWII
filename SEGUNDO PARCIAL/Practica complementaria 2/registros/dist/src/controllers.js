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
exports.borrarRegistro = exports.actualizarRegistro = exports.crearRegistro = exports.obtenerRegistro = exports.obtenerRegistros = void 0;
const model_1 = require("./model");
const obtenerRegistros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 10, desde = 0 } = req.query;
    const query = { estado: true };
    const [total, Registros] = yield Promise.all([
        model_1.Registro.countDocuments(query),
        model_1.Registro.find(query)
            .skip(Number(desde))
            .limit(Number(limite)),
    ]);
    res.json({
        total,
        Registros
    });
});
exports.obtenerRegistros = obtenerRegistros;
const obtenerRegistro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const registro = yield model_1.Registro.findById(id);
    res.json(registro);
});
exports.obtenerRegistro = obtenerRegistro;
const crearRegistro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { estado } = _a, body = __rest(_a, ["estado"]);
    const existeRegistro = yield model_1.Registro.findOne({ periodo: body.periodo });
    if (existeRegistro) {
        return res.status(400).json({
            message: `El registro para este periodo ${body.periodo} ya se encuentra registrado`
        });
    }
    const registro = new model_1.Registro(body);
    const RegistroNuevo = yield registro.save();
    return res.status(201).json(RegistroNuevo);
});
exports.crearRegistro = crearRegistro;
const actualizarRegistro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _b = req.body, { estado } = _b, body = __rest(_b, ["estado"]);
    const RegistroModificado = yield model_1.Registro.findByIdAndUpdate(id, body, { new: true });
    if (!RegistroModificado)
        res.status(404).send({ message: "Registro no encontrado" });
    res.json(RegistroModificado);
});
exports.actualizarRegistro = actualizarRegistro;
const borrarRegistro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const RegistroEliminado = yield model_1.Registro.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(RegistroEliminado);
});
exports.borrarRegistro = borrarRegistro;
