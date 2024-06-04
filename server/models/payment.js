// models/payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    amountPaid: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    method: { type: String, required: true }
});

module.exports = mongoose.model('Payment', paymentSchema);
