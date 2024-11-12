const express = require("express");
const {
  createOrder,
  capturePaymentAndPlaceOrder,
} = require("../controllers/order.controller");
const router = express.Router();

router.route("/create").post(createOrder);
router.route("/capture").post(capturePaymentAndPlaceOrder);

module.exports = router;
