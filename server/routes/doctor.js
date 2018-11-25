var express = require("express");
var router = express.Router();
var doctorController = require("../controller/doctor.controller");

router.post("/register", doctorController.registerDoctor);
router.post("/login", doctorController.loginDoctor);
router.get('/', doctorController.getAllDoctor);

module.exports = router;
