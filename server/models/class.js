// models/class.js
const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
    studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
});

module.exports = mongoose.model('Class', classSchema);
