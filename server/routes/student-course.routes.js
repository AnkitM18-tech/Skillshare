const express = require("express");
const {
  getAllCourses,
  getCourseDetails,
  checkCoursePurchaseInfo,
} = require("../controllers/student-course.controller");
const router = express.Router();

router.route("/get").get(getAllCourses);
router.route("/get/:courseId").get(getCourseDetails);
router
  .route("/purchase-info/:courseId/:studentId")
  .get(checkCoursePurchaseInfo);

module.exports = router;
