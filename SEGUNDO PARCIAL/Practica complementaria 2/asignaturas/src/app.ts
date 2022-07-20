import { Router } from 'express';
import { check } from 'express-validator'
import { obtenerAsignaturas,
    obtenerAsignatura,
    crearAsignatura,
    actualizarAsignatura,
    borrarAsignatura } from './controllers'

import { validarCampos }  from './middleware'

const router = Router()

router.get('/', obtenerAsignaturas)

router.get(
    '/:id',
    check('id', 'El id no es válido').isMongoId(),
    validarCampos,
    obtenerAsignatura)

router.post(
    '/',
    check('nombreMateria', 'El nombre de la asignatura es requerido').notEmpty(),
    check('codigo', 'El codigo de la asignatura es requerido').notEmpty().isAlphanumeric(),
    validarCampos,
    crearAsignatura)


router.put(
    '/:id',
    check('id', 'El id no es válido').isMongoId(),
    validarCampos,
    actualizarAsignatura)

router.delete(
    '/:id',
    check('id', 'El id no es válido').isMongoId(),
    validarCampos,
    borrarAsignatura)

export {
    router as Asignatura
}