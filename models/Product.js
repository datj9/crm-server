const mongoose = require("mongoose");
const { CategorySchema } = require("./Category");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    chipset: String,
    screenSize: Number,
    memory: Number,
    storage: Number,
    price: Number,
    imageUrl: String,
    thumbnailUrl: String,
    category: {
        type: CategorySchema,
    },
    remainingQuantity: {
        type: Number,
        default: 0,
    },
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
