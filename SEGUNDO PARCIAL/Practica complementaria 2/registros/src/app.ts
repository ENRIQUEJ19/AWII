import { Router } from "express";
import { check } from "express-validator";

import  { obtenerRegistros, obtenerRegistro, crearRegistro, actualizarRegistro, borrarRegistro } from "./controllers";

import { validarCampos } from './middleware'

const router = Router()

router.get('/', obtenerRegistros)

router.get(
    '/:id',
    check('id', 'El id no es válido').isMongoId(),
    validarCampos,
    obtenerRegistro)

router.post(
    '/',
    check('periodo', 'El nombre de usuario es requerido').notEmpty(),
    validarCampos,
    crearRegistro)

router.put(
    '/:id',
    check('id', 'El id no es válido').isMongoId(),
    validarCampos,
    actualizarRegistro)

router.delete(
    '/:id',
    check('id', 'El id no es válido').isMongoId(),
    validarCampos,
    borrarRegistro)

export {
    router as Registro
};