// routes/classes.js
const express = require('express');
const router = express.Router();
const Class = require('../models/class');

// GET all classes
router.get('/', async (req, res) => {
    try {
        const classes = await Class.find();
        res.json(classes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a specific class
router.get('/:id', getClass, (req, res) => {
    res.json(res.class);
});

// POST a new class
router.post('/', async (req, res) => {
    const cls = new Class({
        name: req.body.name,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        teachers: req.body.teachers,
        studentsEnrolled: req.body.studentsEnrolled
    });

    try {
        const newClass = await cls.save();
        res.status(201).json(newClass);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Middleware to get a specific class by ID
async function getClass(req, res, next) {
    let cls;
    try {
        cls = await Class.findById(req.params.id);
        if (cls == null) {
            return res.status(404).json({ message: 'Class not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.cls = cls;
    next();
}

module.exports = router;
