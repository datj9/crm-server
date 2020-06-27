const mongoose = require("mongoose");
const { CategorySchema } = require("./Category");
const Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
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
