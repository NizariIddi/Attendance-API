const db = require("../config/db");
const bcrypt = require("bcryptjs");

// Add Student
exports.addStudent = (req, res) => {
  const { name, reg_no, password } = req.body;
  const hashed = bcrypt.hashSync(password, 10);

  const sql = "INSERT INTO students (name, reg_no, password) VALUES (?, ?, ?)";
  db.query(sql, [name, reg_no, hashed], err => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Student added successfully" });
  });
};

// Add Lecturer
exports.addLecturer = (req, res) => {
  const { name, email, password } = req.body;
  const hashed = bcrypt.hashSync(password, 10);

  const sql = "INSERT INTO lecturers (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, hashed], err => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Lecturer added successfully" });
  });
};

// Assign Lecturer to Course
exports.assignLecturer = (req, res) => {
  const { course_id, lecturer_id } = req.body;
  const sql = "UPDATE courses SET lecturer_id = ? WHERE id = ?";
  db.query(sql, [lecturer_id, course_id], err => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Lecturer assigned successfully" });
  });
};
