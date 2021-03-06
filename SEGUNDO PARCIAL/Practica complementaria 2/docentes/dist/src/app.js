"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Docentes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("./controllers");
const middleware_1 = require("./middleware");
const router = (0, express_1.Router)();
exports.Docentes = router;
router.get('/', controllers_1.obtenerDocentes);
router.get('/:id', (0, express_validator_1.check)('id', 'El id del docente no es válido').isMongoId(), middleware_1.validarCampos, controllers_1.obtenerDocente);
router.post('/', (0, express_validator_1.check)('nombredocente', 'El nombre es requerido').notEmpty().isAlpha('es-ES', { ignore: ' ' }), (0, express_validator_1.check)('apellidodocente', 'El apellido es requerido').notEmpty().isAlpha('es-ES', { ignore: ' ' }), middleware_1.validarCampos, controllers_1.crearDocente);
router.put('/:id', (0, express_validator_1.check)('id', 'El id del docente no es válido').isMongoId(), middleware_1.validarCampos, controllers_1.actualizarDocente);
router.delete('/:id', (0, express_validator_1.check)('id', 'El id del docente no es válido').isMongoId(), middleware_1.validarCampos, controllers_1.borrarDocente);
