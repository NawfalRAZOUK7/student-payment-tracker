// routes/payments.js
const express = require('express');
const router = express.Router();
const Payment = require('../models/payment');

// GET all payments
router.get('/', async (req, res) => {
    try {
        const payments = await Payment.find();
        res.json(payments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific payment
router.get('/:id', getPayment, (req, res) => {
    res.json(res.payment);
});

// POST a new payment
router.post('/', async (req, res) => {
    const payment = new Payment({
        studentId: req.body.studentId,
        classId: req.body.classId,
        amountPaid: req.body.amountPaid,
        totalAmount: req.body.totalAmount,
        date: req.body.date,
        method: req.body.method
    });

    try {
        const newPayment = await payment.save();
        res.status(201).json(newPayment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Middleware to get a specific payment by ID
async function getPayment(req, res, next) {
    let payment;
    try {
        payment = await Payment.findById(req.params.id);
        if (payment == null) {
            return res.status(404).json({ message: 'Payment not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.payment = payment;
    next();
}

module.exports = router;
