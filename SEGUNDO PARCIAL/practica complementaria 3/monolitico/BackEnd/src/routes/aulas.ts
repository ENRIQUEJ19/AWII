import { Router } from 'express'
import { check } from 'express-validator'
import { Aula } from '../controllers'

const {
    consultarAulas,
    consultarAula,
    crearAula,
    actualizarAula,
    borrarAula
} = Aula;

import {validarCampos, verificarToken} from '../middlewares'

const router = Router()

router.get('/',
verificarToken,
consultarAulas)

router.get(
    '/:id',
    check('id', 'El id no es válido').isMongoId(),
    verificarToken,
    validarCampos,
    consultarAula)

router.post(
    '/',
    check('numeroDeAula', 'El  número del aula es requerido').notEmpty(),
    check('tipo', 'El tipo de aula es requerido').notEmpty().isAlpha('es-ES', {ignore: ' '}),
    check('piso', 'El piso del aula es requerido').notEmpty().isNumeric(),
    verificarToken,
    validarCampos,
    crearAula)


router.put(
    '/:id',
    check('id', 'El id no es válido').isMongoId(),
    verificarToken,
    validarCampos,
    actualizarAula)

router.delete(
    '/:id',
    check('id', 'El id no es válido').isMongoId(),
    verificarToken,
    validarCampos,
    borrarAula)

export {
    router as Aula
}