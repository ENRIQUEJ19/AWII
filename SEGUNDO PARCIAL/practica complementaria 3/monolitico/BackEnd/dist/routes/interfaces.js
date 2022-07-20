"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interfaces = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.Interfaces = router;
router.get("/", (req, res) => {
    res.render('index', { titulo: `Inicio con HBS` });
});
