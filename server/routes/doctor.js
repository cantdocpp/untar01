var express = require("express");
var router = express.Router();
var doctorController = require("../controller/doctor.controller");

router.post("/", doctorController.registerDoctor);

module.exports = router;
