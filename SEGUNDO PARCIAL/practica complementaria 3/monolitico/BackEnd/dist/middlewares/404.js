"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error404 = void 0;
const error404 = (req, res, next) => {
    res.status(404).render("404", {
        titulo: "404",
        descripcion: "Página no encontrada"
    });
};
exports.error404 = error404;
