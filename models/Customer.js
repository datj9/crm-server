const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    email: String,
    phoneNumber: String,
});

module.exports = new mongoose.model("Customer", CustomerSchema);
