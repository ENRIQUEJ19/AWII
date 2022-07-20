"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetalleHora = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("./controllers");
const middleware_1 = require("./middleware");
const router = (0, express_1.Router)();
exports.DetalleHora = router;
router.get('/', controllers_1.obtenerHoras);
router.get('/:id', (0, express_validator_1.check)('id', 'El id no es válido').isMongoId(), middleware_1.validarCampos, controllers_1.obtenerHora);
router.post('/', (0, express_validator_1.check)('dia', 'Debe especificar el dia que recibe la hora clase').notEmpty().isAlpha(), (0, express_validator_1.check)('horaInicio', 'Debe especificar la hora de inicio').notEmpty(), (0, express_validator_1.check)('horaFin', 'Debe especificar la hora de inicio').notEmpty(), (0, express_validator_1.check)('estudiante', 'Especifique su nombre de usuario').notEmpty(), (0, express_validator_1.check)('asignatura', 'Debe especificar la asignatura').notEmpty().isAlpha('es-ES', { ignore: ' ' }), (0, express_validator_1.check)('docente', 'Debe espeficicar el docente que imparte la asignatura').notEmpty().isAlpha('es-ES', { ignore: ' ' }), (0, express_validator_1.check)('nivel', 'Debe especificar el nivel al cual pertenece la asignatura').notEmpty().isNumeric(), (0, express_validator_1.check)('aula', 'Debe especificar el aula donde se imparte la asignatura').notEmpty(), (0, express_validator_1.check)('paralelo', 'Debe especificar en cual paralelo recibe esta asignatura').notEmpty().isAlpha(), middleware_1.validarCampos, controllers_1.agregarHora);
router.put('/:id', (0, express_validator_1.check)('id', 'El id no es válido').isMongoId(), middleware_1.validarCampos, controllers_1.actualizarHora);
router.delete('/:id', (0, express_validator_1.check)('id', 'El id no es válido').isMongoId(), middleware_1.validarCampos, controllers_1.borrarHora);
