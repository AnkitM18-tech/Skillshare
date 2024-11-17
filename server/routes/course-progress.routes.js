const express = require("express");
const {
  getCourseProgress,
  markLectureAsViewed,
  resetCourseProgress,
} = require("../controllers/course-progress.controller");
const router = express.Router();

router.route("/get/:userId/:courseId").get(getCourseProgress);
router.route("/mark-lecture-viewed").post(markLectureAsViewed);
router.route("/reset-progress").post(resetCourseProgress);

module.exports = router;
