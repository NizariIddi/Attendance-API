const express = require('express');
const app = express();

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/courses", require("./routes/course.routes"));
app.use("/api/attendance", require("./routes/attendence.routes"));

module.exports = app;
