const Order = require('../models/Order');

// @desc    Get all orders
// @route   GET /api/orders
// @access  Public
exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().populate('user').populate('products.product');
        res.status(200).json({ success: true, data: orders });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Create an order
// @route   POST /api/orders
// @access  Public
exports.createOrder = async (req, res, next) => {
    try {
        const { user, products, totalAmount, status } = req.body;
        const order = await Order.create({ user, products, totalAmount, status });
        res.status(201).json({ success: true, data: order });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update an order
// @route   PUT /api/orders/:id
// @access  Public
exports.updateOrder = async (req, res, next) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
        if (!order) {
            return res.status(404).json({ success: false, error: 'Order not found' });
        }
        res.status(200).json({ success: true, data: order });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Delete an order
// @route   DELETE /api/orders/:id
// @access  Public
exports.deleteOrder = async (req, res, next) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, error: 'Order not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

