var express = require("express");
var router = express.Router();
var doctorController = require("../controller/doctor.controller");

router.post("/login", doctorController.loginDoctor);
router.post("/register", doctorController.registerDoctor);
router.get('/', doctorController.getAllDoctor);
router.get('/profile/:user_id', doctorController.getprofileDoctor);

module.exports = router;
