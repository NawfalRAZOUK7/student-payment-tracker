// routes/teachers.js
const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacher');

// GET all teachers
router.get('/', async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.json(teachers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific teacher
router.get('/:id', getTeacher, (req, res) => {
    res.json(res.teacher);
});

// POST a new teacher
router.post('/', async (req, res) => {
    const teacher = new Teacher({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        classesTaught: req.body.classesTaught
    });

    try {
        const newTeacher = await teacher.save();
        res.status(201).json(newTeacher);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Middleware to get a specific teacher by ID
async function getTeacher(req, res, next) {
    let teacher;
    try {
        teacher = await Teacher.findById(req.params.id);
        if (teacher == null) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.teacher = teacher;
    next();
}

module.exports = router;
