const express = require('express');
const { getOrders, createOrder, updateOrder, deleteOrder } = require('../controllers/orderController');

const router = express.Router();

router.route('/')
    .get(getOrders)
    .post(createOrder);

router.route('/:id')
    .put(updateOrder)
    .delete(deleteOrder);

module.exports = router;

