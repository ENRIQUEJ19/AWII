import { Router } from 'express'
import { check } from 'express-validator'
import { obtenerDocentes, obtenerDocente, crearDocente, actualizarDocente, borrarDocente } from './controllers'


import { validarCampos } from './middleware'

const router = Router()

router.get('/', obtenerDocentes)

router.get(
    '/:id',
    check('id', 'El id del docente no es válido').isMongoId(),
    validarCampos,
    obtenerDocente)

router.post(
    '/',
    check('nombredocente', 'El nombre es requerido').notEmpty().isAlpha('es-ES', {ignore:' '}),
    check('apellidodocente', 'El apellido es requerido').notEmpty().isAlpha('es-ES', { ignore:' '}),
    validarCampos,
    crearDocente)

router.put(
    '/:id',
    check('id', 'El id del docente no es válido').isMongoId(),
    validarCampos,
    actualizarDocente)

router.delete(
    '/:id',
    check('id', 'El id del docente no es válido').isMongoId(),
    validarCampos,
    borrarDocente)

export {
    router as Docentes
}