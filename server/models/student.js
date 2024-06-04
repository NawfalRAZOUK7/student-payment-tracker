// models/student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' }
});

module.exports = mongoose.model('Student', studentSchema);
