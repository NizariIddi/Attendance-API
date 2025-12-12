const express = require("express");
const router = express.Router();
const course = require("../controllers/course.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/register", auth, course.registerCourse);
router.get("/:course_id", auth, course.getCourseDetails);

module.exports = router;
