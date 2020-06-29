const Order = require("../../../models/Order");

const getOrders = async (req, res) => {
    try {
        const foundOrders = await Order.find();
        const transformedOrders = foundOrders.map((order) => {
            const transformedOrder = order.transform();
            transformedOrder.products.forEach((product, i) => {
                product[i] = product[i].transform();
            });
            return transformedOrder;
        });

        return res.status(200).json(transformedOrders);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const createOrder = (req, res) => {
    const { products } = req.body;
    products.forEach((product) => {});
    const newOrder = new Order({});
};

module.exports = { getOrders };
