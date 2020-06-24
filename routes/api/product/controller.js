const { Product } = require("../../../models/Product");

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = { getProducts };
