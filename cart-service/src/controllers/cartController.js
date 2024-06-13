const Cart = require('../models/Cart');

// @desc    Get user cart
// @route   GET /api/cart/:userId
// @access  Public
exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate('items.product');
    res.status(200).json({ success: true, data: cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart/:userId
// @access  Public
exports.addItemToCart = async (req, res, next) => {
  const { product, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.params.userId });

    if (!cart) {
      cart = new Cart({ user: req.params.userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === product);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product, quantity });
    }

    await cart.save();
    res.status(200).json({ success: true, data: cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:userId/:itemId
// @access  Public
exports.removeItemFromCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId });

    if (!cart) {
      return res.status(404).json({ success: false, error: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);

    await cart.save();
    res.status(200).json({ success: true, data: cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
