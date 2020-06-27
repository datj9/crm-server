const { Category } = require("../../../models/Category");
const ObjectId = require("mongoose").Types.ObjectId;

const getCategories = async (req, res) => {
    try {
        const foundCategories = await Category.find().populate("parentCategory");
        const categories = foundCategories.map((category) => ({
            ...category.transform(),
            parentCategory: category.parentCategory && category.parentCategory.transform(),
        }));
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const createCategory = async (req, res) => {
    const { name, parentCategory } = req.body;
    const errors = {};
    const parentCategoryIsValid = ObjectId.isValid(parentCategory + "");

    if (!name) errors.name = "Name is required";
    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    try {
        if (parentCategoryIsValid) {
            const parentCate = await Category.findById(parentCategory);
            if (!parentCate) return res.status(404).json({ error: "parentCategory not found" });

            const category = new Category({
                name,
                parentCategory: parentCate,
            });
            await category.save();
            return res.status(201).json({
                ...category.transform(),
                parentCategory: parentCate.transform(),
            });
        } else {
            const category = new Category({
                name,
            });
            await category.save();
            return res.status(201).json(category.transform());
        }
    } catch (error) {
        if (error.code == 11000) {
            return res.status(400).json({
                name: "Category already exists",
            });
        }
        return res.status(500).json(error);
    }
};

const deleteCategory = async (req, res) => {
    const { categoryId } = req.params;

    if (!ObjectId.isValid(categoryId)) return res.status(400).json({ categoryId: "CategoryId is invalid" });

    try {
        const category = await Category.findById(categoryId);
        if (!category) return res.status(404).json({ error: "Category not found" });
        await Category.deleteOne({ _id: categoryId });
        return res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = { getCategories, createCategory, deleteCategory };
