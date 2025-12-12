const express = require("express");
const router = express.Router();
const admin = require("../controllers/admin.controller");

router.post("/add-student", admin.addStudent);
router.post("/add-lecturer", admin.addLecturer);
router.post("/assign-lecturer", admin.assignLecturer);

module.exports = router;
