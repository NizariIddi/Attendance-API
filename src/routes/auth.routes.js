const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth.controller");

router.post("/student/login", auth.studentLogin);
router.post("/lecturer/login", auth.lecturerLogin);

module.exports = router;
