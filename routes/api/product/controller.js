const { Product } = require("../../../models/Product");
const { Category } = require("../../../models/Category");

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const createProduct = async (req, res) => {
    const { name, category, remainingQuantity, price } = req.body;
    const foundCategory = await Category.findById(category);
    const product = new Product({
        name,
        category: foundCategory,
        remainingQuantity,
        price,
    });
    try {
        await product.save();
        return res.status(201).json(product);
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = { getProducts, createProduct };
