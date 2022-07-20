import { Router } from 'express'
import { check } from 'express-validator'
import { consultarAulas,
    consultarAula,
    crearAula,
    actualizarAula,
    borrarAula } from './controllers'


import { validarCampos } from './middleware'


const router = Router()

router.get('/', consultarAulas)

router.get(
    '/:id',
    check('id', 'El id no es válido').isMongoId(),
    validarCampos,
    consultarAula)

router.post(
    '/',
    check('numeroDeAula', 'El  número del aula es requerido').notEmpty(),
    check('tipo', 'El tipo de aula es requerido').notEmpty().isAlpha('es-ES', {ignore: ' '}),
    check('piso', 'El piso del aula es requerido').notEmpty().isNumeric(),
    validarCampos,
    crearAula)


router.put(
    '/:id',
    check('id', 'El id no es válido').isMongoId(),
    validarCampos,
    actualizarAula)

router.delete(
    '/:id',
    check('id', 'El id no es válido').isMongoId(),
    validarCampos,
    borrarAula)

export {
    router as Aula
}