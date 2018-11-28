var express = require("express");
var router = express.Router();
var patientController = require("../controller/patient.controller");
var doctorController = require("../controller/doctor.controller");


//complete
router.get("/", patientController.getAllPatient);
router.post("/register", patientController.registerPatient);


//working
router.post("/login",patientController.loginPatient);
router.post("/schedule/:doctor_id",patientController.makeschedule);


module.exports = router;
