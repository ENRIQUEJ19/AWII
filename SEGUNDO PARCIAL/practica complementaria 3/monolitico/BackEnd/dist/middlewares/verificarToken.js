"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verificarToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token)
        return res.status(401).json({ error: 'Acceso denegado' });
    try {
        const verified = jsonwebtoken_1.default.verify(token, String(process.env["TOKEN_SECRET"]));
        req.user = verified;
        next(); // continuamos
    }
    catch (error) {
        res.status(400).json({ error: 'token no válido' });
    }
};
exports.verificarToken = verificarToken;
