import { Router } from "express";
import { check } from "express-validator";
import { Registro } from "../controllers";

import { validarCampos, verificarToken } from '../middlewares'

const { obtenerRegistros, obtenerRegistro, crearRegistro, actualizarRegistro, borrarRegistro }= Registro;

const router = Router()

router.get('/', 
    verificarToken,
    obtenerRegistros
)

router.get(
    '/:id',
    check('id', 'El id no es válido').isMongoId(),
    verificarToken,
    validarCampos,
    obtenerRegistro)

router.post(
    '/',
    check('periodo', 'El nombre de usuario es requerido').notEmpty(),
    verificarToken,
    validarCampos,
    crearRegistro)

router.put(
    '/:id',
    check('id', 'El id no es válido').isMongoId(),
    verificarToken,
    validarCampos,
    actualizarRegistro)

router.delete(
    '/:id',
    check('id', 'El id no es válido').isMongoId(),
    verificarToken,
    validarCampos,
    borrarRegistro)

export {
    router as Registro
};