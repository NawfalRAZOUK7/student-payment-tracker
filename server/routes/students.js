// routes/students.js
const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// GET all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific student
router.get('/:id', getStudent, (req, res) => {
    res.json(res.student);
});

// POST a new student
router.post('/', async (req, res) => {
    const student = new Student({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        classId: req.body.classId
    });

    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Middleware to get a specific student by ID
async function getStudent(req, res, next) {
    let student;
    try {
        student = await Student.findById(req.params.id);
        if (student == null) {
            return res.status(404).json({ message: 'Student not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.student = student;
    next();
}

module.exports = router;
