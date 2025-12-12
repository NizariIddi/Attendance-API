const db = require("../config/db");

// Start session (Lecturer only)
exports.startSession = (req, res) => {
  if (req.user.role !== "lecturer") return res.status(403).json({ message: "Access denied" });
  const { course_id } = req.body;
  const sql = "INSERT INTO attendance_sessions (course_id, start_time, is_active) VALUES (?, NOW(), true)";
  db.query(sql, [course_id], err => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Attendance session started" });
  });
};

// End session
exports.endSession = (req, res) => {
  const { session_id } = req.body;
  const sql = "UPDATE attendance_sessions SET end_time = NOW(), is_active = false WHERE id = ?";
  db.query(sql, [session_id], err => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Attendance session closed" });
  });
};

// Student check-in
exports.checkIn = (req, res) => {
  if (req.user.role !== "student") return res.status(403).json({ message: "Access denied" });

  const student_id = req.user.id;
  const { course_id } = req.body;

  const sessionSql = "SELECT * FROM attendance_sessions WHERE course_id = ? AND is_active = true";
  db.query(sessionSql, [course_id], (err, sessions) => {
    if (err) return res.status(500).json(err);
    if (sessions.length === 0) return res.status(403).json({ message: "No active session" });

    const session = sessions[0];
    const now = new Date();
    const status = now > session.start_time ? "late" : "present";

    const recordSql = "INSERT INTO attendance_records (student_id, session_id, check_in_time, status) VALUES (?, ?, NOW(), ?)";
    db.query(recordSql, [student_id, session.id, status], err => {
      if (err) return res.status(409).json({ message: "Already checked in" });
      res.json({ message: "Attendance recorded", status });
    });
  });
};
