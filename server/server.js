require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth.routes");
const mediaRouter = require("./routes/media.routes");
const courseRouter = require("./routes/course.routes");
const studentCourseRouter = require("./routes/student-course.routes");
const orderRouter = require("./routes/order.routes");
const studentEnrolledCoursesRouter = require("./routes/student-enrolled-courses.routes");
const courseProgressRouter = require("./routes/course-progress.routes");
const path = require("path");

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// database connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB is Connected"))
  .catch((e) => console.log("Error while connecting to MongoDB :", e));

// routes configuration
app.use("/auth", authRouter);
app.use("/media", mediaRouter);
app.use("/instructor/course", courseRouter);
app.use("/student/course", studentCourseRouter);
app.use("/student/order", orderRouter);
app.use("/student/enrolled-courses", studentEnrolledCoursesRouter);
app.use("/student/course-progress", courseProgressRouter);

// serving frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
  });
}

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
