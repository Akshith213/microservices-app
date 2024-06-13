const Payment = require('../models/Payment');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// @desc    Create a payment
// @route   POST /api/payments
// @access  Public
exports.createPayment = async (req, res, next) => {
  const { user, order, amount, paymentMethod } = req.body;

  try {
    // Create a new payment record in the database
    const payment = new Payment({
      user,
      order,
      amount,
      paymentMethod
    });

    // Process the payment using Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method: paymentMethod,
      confirmation_method: 'manual',
      confirm: true
    });

    payment.status = paymentIntent.status;
    await payment.save();

    res.status(201).json({ success: true, data: payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get all payments
// @route   GET /api/payments
// @access  Public
exports.getPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find();
    res.status(200).json({ success: true, data: payments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
