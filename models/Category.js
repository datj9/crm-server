const mongoose = require("mongoose");
const { Product } = require("./Product");

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
});
CategorySchema.pre("remove", async function (doc, next) {
    try {
        console.log(next);
        await Product.deleteMany().where("category").eq(doc._id);
        next();
    } catch (error) {
        next(error);
    }
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
