const express = require("express");
const {
  getAllCourses,
  getCourseDetails,
} = require("../controllers/student-course.controller");
const router = express.Router();

router.route("/get").get(getAllCourses);
router.route("/get/:courseId").get(getCourseDetails);

module.exports = router;
