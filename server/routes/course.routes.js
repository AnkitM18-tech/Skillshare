const express = require("express");
const {
  addNewCourse,
  getAllCourses,
  getCourseDetails,
  updateCourse,
} = require("../controllers/course.controller");

const router = express.Router();

router.route("/add").post(addNewCourse);
router.route("/get").get(getAllCourses);
router.route("/get/:id").get(getCourseDetails);
router.route("/update/:id").put(updateCourse);

module.exports = router;
