const express = require('express');
const path = require("path")

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../pubic")))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"))
})

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/courses", require("./routes/course.routes"));
app.use("/api/attendance", require("./routes/attendence.routes"));

module.exports = app;
