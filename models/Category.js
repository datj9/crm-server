const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    parentCategory: mongoose.Schema.Types.ObjectId,
});

const Category = new mongoose.model("Category", CategorySchema);

module.exports = {
    CategorySchema,
    Category,
};
