const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

const teacherModel = require('../models/teacher.model')
const studentModel = require('../models/student.model')


/* Reset */
router.post('/', async (req, res, next) => {
    try {
        const checkLoginStudent = await studentModel.findOne({ gmail: req.body.gmail })
        const checkLoginTeacher = await teacherModel.findOne({ gmail: req.body.gmail })



        if (checkLoginStudent == null && checkLoginTeacher == null) {
            return res.status(400).json("Gmail error");
        }
        else if (checkLoginStudent) {
            const id = checkLoginStudent?.id

            await studentModel.updateOne({ _id: id },
                {
                    password: 'kiendeptry',
                })
            res.status(200).json(
                {
                    msg: 'Update success',
                    data: 'kiendeptry'
                }
            )

        }
        else if (checkLoginTeacher) {
            const id = checkLoginTeacher?.id

            await teacherModel.updateOne({ _id: id },
                {
                    password: 'kiendeptry',
                })

            res.status(200).json(
                {
                    msg: 'Update success',
                    data: 'kiendeptry'
                }
            )

        }

    } catch (err) {
        return res.status(400).json(err);
    }
});

module.exports = router;