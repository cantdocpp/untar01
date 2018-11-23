var express = require("express");
var router = express.Router();
var patientController = require("../controller/patient.controller");
var doctorController = require("../controller/doctor.controller");

router.post("/register", patientController.registerPatient);
router.get("/", patientController.getAllPatient);
router.post(
  "/login",
  patientController.loginPatient,
  doctorController.loginDoctor
);

module.exports = router;
