const express = require("express");
const router = express.Router();
const customerController = require("./controller");

router.get("/", customerController.getCustomers);
router.post("/", customerController.createCustomer);
router.delete("/:customerId", customerController.deleteCustomer);

module.exports = router;
