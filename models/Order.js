const mongoose = require("mongoose");
const { ProductSchema } = require("./Product");

const OrderSchema = new mongoose.Schema({
    product: {
        type: ProductSchema,
        required: true,
    },
    quantity: String,
    orderTime: {
        type: Date,
        required: true,
    },
    shippingTime: {
        type: Date,
        required: true,
    },
});

module.exports = new mongoose.model("Order", OrderSchema);
