import { Router } from 'express';
import { check } from 'express-validator';

import {  obtenerHoras, obtenerHora, agregarHora, actualizarHora, borrarHora }  from './controllers';


import {validarCampos} from './middleware';


const router = Router();

router.get('/', obtenerHoras);

router.get(
    '/:id',
    check('id', 'El id no es válido').isMongoId(),
    validarCampos,
    obtenerHora
);

router.post(
    '/',
    check('dia', 'Debe especificar el dia que recibe la hora clase').notEmpty().isAlpha(),
    check('horaInicio', 'Debe especificar la hora de inicio').notEmpty(),
    check('horaFin', 'Debe especificar la hora de inicio').notEmpty(),
    check('estudiante', 'Especifique su nombre de usuario').notEmpty(),
    check('asignatura', 'Debe especificar la asignatura').notEmpty().isAlpha('es-ES', {ignore:' '}),
    check('docente', 'Debe espeficicar el docente que imparte la asignatura').notEmpty().isAlpha('es-ES', {ignore:' '}),
    check('nivel', 'Debe especificar el nivel al cual pertenece la asignatura').notEmpty().isNumeric(),
    check('aula', 'Debe especificar el aula donde se imparte la asignatura').notEmpty(),
    check('paralelo', 'Debe especificar en cual paralelo recibe esta asignatura').notEmpty().isAlpha(),  
    validarCampos,
    agregarHora 
);

router.put(
    '/:id',
    check('id', 'El id no es válido').isMongoId(),
    validarCampos,
    actualizarHora
);

router.delete(
    '/:id',
    check('id', 'El id no es válido').isMongoId(),
    validarCampos,
    borrarHora
);

export {
    router as DetalleHora
};


