const express = require('express');
const { getCart, addItemToCart, removeItemFromCart } = require('../controllers/cartController');

const router = express.Router();

router.route('/:userId')
  .get(getCart)
  .post(addItemToCart);

router.route('/:userId/:itemId')
  .delete(removeItemFromCart);

module.exports = router;
