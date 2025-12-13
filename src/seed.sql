-- ===========================================
-- DATABASE: attendance_db
-- ===========================================

-- DROP TABLES IF THEY EXIST
DROP TABLE IF EXISTS attendance_records;

DROP TABLE IF EXISTS attendance_sessions;

DROP TABLE IF EXISTS student_courses;

DROP TABLE IF EXISTS courses;

DROP TABLE IF EXISTS lecturers;

DROP TABLE IF EXISTS students;

-- ===========================================
-- TABLE: students
-- ===========================================
CREATE TABLE students (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    reg_no VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- ===========================================
-- TABLE: lecturers
-- ===========================================
CREATE TABLE lecturers (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- ===========================================
-- TABLE: courses
-- ===========================================
CREATE TABLE courses (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    course_code VARCHAR(20) NOT NULL,
    course_name VARCHAR(100),
    lecturer_id INT DEFAULT NULL,
    FOREIGN KEY (lecturer_id) REFERENCES lecturers (id)
);

-- ===========================================
-- TABLE: student_courses
-- ===========================================
CREATE TABLE student_courses (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    course_id INT,
    UNIQUE (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students (id),
    FOREIGN KEY (course_id) REFERENCES courses (id)
);

-- ===========================================
-- TABLE: attendance_sessions
-- ===========================================
CREATE TABLE attendance_sessions (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    course_id INT,
    start_time DATETIME DEFAULT NULL,
    end_time DATETIME DEFAULT NULL,
    is_active TINYINT(1) DEFAULT 1,
    FOREIGN KEY (course_id) REFERENCES courses (id)
);

-- ===========================================
-- TABLE: attendance_records
-- ===========================================
CREATE TABLE attendance_records (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    session_id INT,
    check_in_time DATETIME DEFAULT NULL,
    status ENUM('present', 'late') DEFAULT NULL,
    UNIQUE (student_id, session_id),
    FOREIGN KEY (student_id) REFERENCES students (id),
    FOREIGN KEY (session_id) REFERENCES attendance_sessions (id)
);

-- VIEW for coreating lecturer_courses

CREATE OR REPLACE VIEW lecturer_courses AS
SELECT
    l.id AS lecturer_id,
    l.name AS lecturer_name,
    l.email AS lecturer_email,
    c.id AS course_id,
    c.course_code,
    c.course_name
FROM lecturers l
    LEFT JOIN courses c ON l.id = c.lecturer_id;

-- ===========================================
-- INSERT SAMPLE DATA
-- ===========================================

-- Sample students (passwords hashed with bcrypt "12345")
INSERT INTO
    students (reg_no, name, password)
VALUES (
        'ST1001',
        'Nizar Student',
        '$2b$10$TJUTwnUGjCiiuteSF.dS7etQRiU6z/cKG615ToOQerrkVHOMQFh5e'
    ),
    (
        'ST1002',
        'John Student',
        '$2b$10$TJUTwnUGjCiiuteSF.dS7etQRiU6z/cKG615ToOQerrkVHOMQFh5e'
    );

-- Sample lecturers (passwords hashed with bcrypt "12345")
INSERT INTO
    lecturers (email, name, password)
VALUES (
        'lecturer@test.com',
        'Mr. John',
        '$2b$10$TJUTwnUGjCiiuteSF.dS7etQRiU6z/cKG615ToOQerrkVHOMQFh5e'
    ),
    (
        'lecturer@test1.com',
        'Mr. Teacher',
        '$2b$10$TJUTwnUGjCiiuteSF.dS7etQRiU6z/cKG615ToOQerrkVHOMQFh5e'
    );

-- Sample courses
INSERT INTO
    courses (
        course_code,
        course_name,
        lecturer_id
    )
VALUES (
        'CS101',
        'Computer Science 101',
        1
    ),
    (
        'MATH101',
        'Mathematics 101',
        2
    );

-- Sample student course registrations
INSERT INTO
    student_courses (student_id, course_id)
VALUES (1, 1),
    (2, 2);

-- Sample attendance sessions
INSERT INTO
    attendance_sessions (
        course_id,
        start_time,
        end_time,
        is_active
    )
VALUES (1, NOW(), NULL, 1),
    (2, NOW(), NULL, 1);

-- Sample attendance records (empty for now, students will check in)