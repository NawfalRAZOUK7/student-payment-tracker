// models/teacher.js
const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    classesTaught: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }]
});

module.exports = mongoose.model('Teacher', teacherSchema);
