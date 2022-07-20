import { Router } from 'express'
import { check } from 'express-validator'
import { Docentes } from '../controllers'

const { obtenerDocentes, obtenerDocente, crearDocente, actualizarDocente, borrarDocente } = Docentes;

import { validarCampos, verificarToken } from '../middlewares'

const router = Router()

router.get('/', 
    verificarToken,
    obtenerDocentes
)

router.get(
    '/:id',
    check('id', 'El id del docente no es válido').isMongoId(),
    verificarToken,
    validarCampos,
    obtenerDocente)

router.post(
    '/',
    check('nombredocente', 'El nombre es requerido').notEmpty().isAlpha('es-ES', {ignore:' '}),
    check('apellidodocente', 'El apellido es requerido').notEmpty().isAlpha('es-ES', { ignore:' '}),
    verificarToken,
    validarCampos,
    crearDocente)

router.put(
    '/:id',
    check('id', 'El id del docente no es válido').isMongoId(),
    verificarToken,
    validarCampos,
    actualizarDocente)

router.delete(
    '/:id',
    check('id', 'El id del docente no es válido').isMongoId(),
    verificarToken,
    validarCampos,
    borrarDocente)

export {
    router as Docentes
}