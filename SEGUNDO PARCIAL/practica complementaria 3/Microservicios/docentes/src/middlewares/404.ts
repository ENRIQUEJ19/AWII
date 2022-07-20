import { NextFunction, Request, Response } from "express"

export const error404 = (req:Request, res:Response, next:NextFunction) => {
    res.status(404).render("404", {
        titulo: "404",
        descripcion: "Página no encontrada"
    })
}