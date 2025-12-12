const express = require("express");
const router = express.Router();
const attendance = require("../controllers/attendence.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/start", auth, attendance.startSession);
router.post("/end", auth, attendance.endSession);
router.post("/checkin", auth, attendance.checkIn);

module.exports = router;
