var express = require("express");
var router = express.Router();
var doctorController = require("../controller/doctor.controller");


//Complete
router.post("/login", doctorController.loginDoctor);
router.post("/register", doctorController.registerDoctor);
router.get("/", doctorController.getAllDoctor);
router.delete("/cancleshedule/:apoinment_id", doctorController.cancleshedule);
router.post("/finishappoint/:apoinment_id", doctorController.finishchedule);

//working
router.post("/dashboard/:user_id", doctorController.getdashboard);







// router.get('/profile/:user_id', doctorController.getprofileDoctor);
// router.get('/setting/:user_id', doctorController.getprofileDoctor);
// router.post('/setting/:user_id', doctorController.getprofileDoctor);
router.get("/profile/:id", doctorController.getDoctorById);
router.get("/specialist/:specialist", doctorController.getDoctorBySpeciality);
router.put("/edit/:id", doctorController.editDoctorById);
module.exports = router;
