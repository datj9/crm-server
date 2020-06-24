const { Category } = require("../../../models/Category");

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const createCategory = async (req, res) => {
    const { name, parentCategory } = req.body;

    try {
        const parentCate = await Category.findById(parentCategory);
        const category = new Category({
            name,
            parentCategory: parentCate,
        });
        await category.save();
        return res.status(201).json(category);
    } catch (error) {
        if (error.code == 11000) {
            return res.status(400).json({
                name: "Category already exists",
            });
        }
        return res.status(500).json(error);
    }
};

module.exports = { getCategories, createCategory };
