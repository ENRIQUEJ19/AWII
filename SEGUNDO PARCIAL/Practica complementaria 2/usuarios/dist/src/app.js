"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const controllers_1 = require("./controllers");
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const middleware_1 = require("./middleware");
const router = (0, express_1.Router)();
exports.Usuario = router;
router.get('/', controllers_1.obtenerUsuarios);
router.get('/:id', (0, express_validator_1.check)('id', 'El id no es válido').isMongoId(), middleware_1.validarCampos, controllers_1.obtenerUsuario);
router.post('/', (0, express_validator_1.check)('username', 'El nombre de usuario es requerido').notEmpty(), (0, express_validator_1.check)('datos.nombre', 'El nombre es requerido').notEmpty().isAlpha(), (0, express_validator_1.check)('datos.apellido', 'El apellido es requerido').notEmpty().isAlpha(), (0, express_validator_1.check)('datos.cedula', 'La cédula es requerida').notEmpty().isNumeric().isLength({ min: 10, max: 10 }), (0, express_validator_1.check)('email', 'El correo no es válido').notEmpty().isEmail(), (0, express_validator_1.check)('contrasena', 'La contraseña de usuario es requerida').notEmpty(), //.isStrongPassword() puede usarse para mejorar la seguridad de la contraseña
middleware_1.validarCampos, controllers_1.crearUsuario);
router.post('/login', (0, express_validator_1.check)('username', 'El nombre de usuario es requerido').notEmpty(), (0, express_validator_1.check)('contrasena', 'La contraseña de usuario es requerida').notEmpty(), middleware_1.validarCampos, controllers_1.login);
router.post('/loggout', controllers_1.loggout);
router.put('/:id', (0, express_validator_1.check)('id', 'El id no es válido').isMongoId(), middleware_1.validarCampos, controllers_1.actualizarUsuario);
router.delete('/:id', (0, express_validator_1.check)('id', 'El id no es válido').isMongoId(), middleware_1.validarCampos, controllers_1.borrarUsuario);
