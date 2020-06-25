const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    parentCategory: mongoose.Schema.Types.ObjectId,
});

CategorySchema.method("transform", function () {
    const obj = this.toObject();

    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    return obj;
});

const Category = new mongoose.model("Category", CategorySchema);

module.exports = {
    CategorySchema,
    Category,
};
