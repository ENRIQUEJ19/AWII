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
exports.borrarDocente = exports.actualizarDocente = exports.crearDocente = exports.obtenerDocente = exports.obtenerDocentes = void 0;
const models_1 = require("../models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const obtenerDocentes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('auth-token');
    const { id } = jsonwebtoken_1.default.decode(String(token));
    const query = { $and: [
            { estado: true },
            { user: id }
        ] };
    try {
        const ListaDocentes = yield models_1.Docentes.find(query);
        res.json(ListaDocentes);
    }
    catch (error) {
        console.error(error);
    }
});
exports.obtenerDocentes = obtenerDocentes;
const obtenerDocente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const docente = yield models_1.Docentes.findById(id);
    res.json(docente);
});
exports.obtenerDocente = obtenerDocente;
const crearDocente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { estado } = _a, body = __rest(_a, ["estado"]);
    const token = req.header('auth-token');
    const { id } = jsonwebtoken_1.default.decode(String(token));
    const existeDocente = yield models_1.Docentes.findOne({ $and: [
            { nombredocente: body.nombredocente },
            { apellidodocente: body.apellidodocente },
            { user: id }
        ] });
    if (existeDocente) {
        return res.status(400).send({
            message: `El Docente con ese nombre ${body.nombredocente} y con este apellido ${body.apellidodocente} ya se encuentra registrado`
        });
    }
    body.user = id;
    const docente = new models_1.Docentes(body);
    const DocenteNuevo = yield docente.save();
    return res.status(201).json(DocenteNuevo);
});
exports.crearDocente = crearDocente;
const actualizarDocente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _b = req.body, { estado } = _b, body = __rest(_b, ["estado"]);
    const DocenteModificado = yield models_1.Docentes.findByIdAndUpdate(id, body, { new: true });
    if (!DocenteModificado)
        res.status(404).send({ message: "Docente no encontrado" });
    res.json(DocenteModificado);
});
exports.actualizarDocente = actualizarDocente;
const borrarDocente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const DocenteEliminado = yield models_1.Docentes.findByIdAndDelete(id);
    res.json(DocenteEliminado);
});
exports.borrarDocente = borrarDocente;
