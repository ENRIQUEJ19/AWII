import { Router } from 'express';
import { check } from 'express-validator'
import { Asignatura } from '../controllers'

const {
    obtenerAsignaturas,
    obtenerAsignatura,
    crearAsignatura,
    actualizarAsignatura,
    borrarAsignatura
} = Asignatura;

import { validarCampos, verificarToken } from '../middlewares'

const router = Router()

router.get('/', 
verificarToken,
obtenerAsignaturas)

router.get(
    '/:id',
    check('id', 'El id no es válido').isMongoId(),
    validarCampos,
    obtenerAsignatura)

router.post(
    '/',
    check('nombreMateria', 'El nombre de la asignatura es requerido').notEmpty(),
    check('codigo', 'El codigo de la asignatura es requerido').notEmpty().isAlphanumeric(),
    verificarToken,
    validarCampos,
    crearAsignatura)


router.put(
    '/:id',
    check('id', 'El id no es válido').isMongoId(),
    verificarToken,
    validarCampos,
    actualizarAsignatura)

router.delete(
    '/:id',
    check('id', 'El id no es válido').isMongoId(),
    verificarToken,
    validarCampos,
    borrarAsignatura)

export {
    router as Asignatura
}