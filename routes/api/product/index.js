const express = require("express");
const router = express.Router();
const productController = require("./controller");

router.get("/", productController.getProducts);
router.post("/", productController.createProduct);
router.delete("/:productId", productController.deleteProduct);

module.exports = router;
