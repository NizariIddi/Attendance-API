const db = require("../config/db");

// Student registers for a course
exports.registerCourse = (req, res) => {
  const student_id = req.user.id;
  const { course_id } = req.body;

  const sql = "INSERT INTO student_courses (student_id, course_id) VALUES (?, ?)";
  db.query(sql, [student_id, course_id], err => {
    if (err) return res.status(400).json({ message: "Already registered" });
    res.json({ message: "Course registration successful" });
  });
};

// Get course details + lecturer info
exports.getCourseDetails = (req, res) => {
  const { course_id } = req.params;
  const sql = `
    SELECT c.course_code, c.course_name,
           l.name AS lecturer_name, l.email AS lecturer_email
    FROM courses c
    LEFT JOIN lecturers l ON c.lecturer_id = l.id
    WHERE c.id = ?
  `;
  db.query(sql, [course_id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
};
