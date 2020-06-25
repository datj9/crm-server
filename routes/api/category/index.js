const express = require("express");
const router = express.Router();
const categoryController = require("./controller");

router.get("/", categoryController.getCategories);
router.post("/", categoryController.createCategory);
router.delete("/:categoryId", categoryController.deleteCategory);

module.exports = router;
