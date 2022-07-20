import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express";

const verificarToken = (req:Request, res:Response, next:NextFunction) => {
    const token = req.header('auth-token')
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
        const verified = jwt.verify(token, String(process.env["TOKEN_SECRET"]))
        req.user = verified
        next() // continuamos
    } catch (error) {
        res.status(400).json({error: 'token no válido'})
    }
}
export {verificarToken}