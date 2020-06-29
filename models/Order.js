const mongoose = require("mongoose");
const { ProductSchema } = require("./Product");

const OrderSchema = new mongoose.Schema({
    products: {
        type: [
            {
                productDetail: ProductSchema,
                quantity: Number,
            },
        ],
        required: true,
    },
    orderTime: {
        type: Date,
        required: true,
    },
    shippingTime: {
        type: Date,
        required: true,
    },
});

OrderSchema.method("transform", function () {
    const obj = this.toObject();

    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    return obj;
});

module.exports = new mongoose.model("Order", OrderSchema);
