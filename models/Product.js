const mongoose = require("mongoose");
const { CategorySchema } = require("./Category");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: CategorySchema,
        required: true,
    },
    remainingQuantity: {
        type: Number,
        default: 0,
    },
    price: Number,
});

ProductSchema.method("transform", function () {
    const obj = this.toObject();

    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    return obj;
});

const Product = new mongoose.model("Product", ProductSchema);

module.exports = {
    ProductSchema,
    Product,
};
