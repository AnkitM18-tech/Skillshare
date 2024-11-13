const express = require("express");
const {
  getCoursesBoughtByStudentId,
} = require("../controllers/student-enroll.controller");

const router = express.Router();

router.route("/get/:studentId").get(getCoursesBoughtByStudentId);

module.exports = router;
