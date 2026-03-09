const express = require("express");

const router = express.Router();

const {
  patchOrder,
  getOrders
} = require("../controllers/order.controller");

router.get("/", getOrders);
router.patch("/:id", patchOrder);

module.exports = router;