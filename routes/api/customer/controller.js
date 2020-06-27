const Customer = require("../../../models/Customer");
const isEmpty = require("validator/lib/isEmpty");
const isNumeric = require("validator/lib/isNumeric");
const isInt = require("validator/lib/isInt");
const ObjectId = require("mongoose").Types.ObjectId;

const getCustomers = async (req, res) => {
    try {
        const foundCustomers = await Customer.find();
        const customers = await foundCustomers.map((c) => c.transform());
        return res.status(200).json(customers);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const createCustomer = async (req, res) => {
    const { name, gender, email, phoneNumber } = req.body;
    const errors = {};

    if (!name) errors.name = "Name is required";
    if (!gender == undefined) errors.gender = "Gender is required";
    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    if (typeof gender != "number" || (gender != 1 && gender != 0)) {
        return res.status(400).json({ gender: "Gender is invalid" });
    }

    const newCustomer = new Customer({
        name,
        gender,
        email,
        phoneNumber,
    });

    try {
        await newCustomer.save();
        return res.status(201).json(newCustomer.transform());
    } catch (error) {
        return res.status(500).json(errors);
    }
};

const deleteCustomer = async (req, res) => {
    const { customerId } = req.params;

    if (!ObjectId.isValid(customerId)) return res.status(400).json({ customerId: "CustomerId is invalid" });

    try {
        const customer = await Customer.findById(customerId);
        if (!customer) return res.status(404).json({ error: "Customer not found" });
        await Customer.deleteOne({ _id: customerId });
        return res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = { getCustomers, createCustomer, deleteCustomer };
