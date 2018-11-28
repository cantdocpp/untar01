var express = require("express");
var router = express.Router();
var doctorController = require("../controller/doctor.controller");

router.post("/login", doctorController.loginDoctor);
router.post("/register", doctorController.registerDoctor);
router.get("/", doctorController.getAllDoctor);
// router.get('/profile/:user_id', doctorController.getprofileDoctor);
// router.get('/setting/:user_id', doctorController.getprofileDoctor);
// router.post('/setting/:user_id', doctorController.getprofileDoctor);
router.get("/id/:id", doctorController.getDoctorById);
router.get("/specialist/:specialist", doctorController.getDoctorBySpeciality);
router.put("/id", doctorController.editDoctorById);
module.exports = router;
