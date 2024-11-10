require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth.routes");
const mediaRouter = require("./routes/media.routes");
const courseRouter = require("./routes/course.routes");
const studentCourseRouter = require("./routes/student-course.routes");

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
