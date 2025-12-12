const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = "attendance_secret";

// ==================== STUDENT LOGIN ====================
exports.studentLogin = (req, res) => {
  const { reg_no, password } = req.body;
  const sql = "SELECT * FROM students WHERE reg_no = ?";
  db.query(sql, [reg_no], async (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(401).json({ message: "Invalid credentials" });

    const student = result[0];
    const match = await bcrypt.compare(password, student.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: student.id, role: "student" }, SECRET, { expiresIn: "1d" });
    res.json({ message: "Login success", token });
  });
};

// ==================== LECTURER LOGIN ====================
exports.lecturerLogin = (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM lecturers WHERE email = ?";
  db.query(sql, [email], async (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(401).json({ message: "Invalid credentials" });

    const lecturer = result[0];
    const match = await bcrypt.compare(password, lecturer.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: lecturer.id, role: "lecturer" }, SECRET, { expiresIn: "1d" });
    res.json({ message: "Login success", token });
  });
};
