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

const Product = new mongoose.model("Product", ProductSchema);

module.exports = {
    ProductSchema,
    Product,
};
