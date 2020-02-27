const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const attendance = require('../Schema/AttendanceSchema');


//POST method
router.post('/', async (req, res) => {
    console.log(req.body.Year)
    try {
        const postStudent = await new attendance({
            Date: req.body.Date,
            Regno: req.body.Regno,
            isPresent: req.body.isPresent,
            Department: req.body.Department,
            Year: req.body.Year

        });
        const saveStudent = await postStudent.save();
        res.status(200).json(saveStudent);
    } catch (err) {
        res.json({ "err": err });
    }
});

//GET  method
router.get('/', async (req, res) => {
    try {
        const getAll = await attendance.find();
        console.log(getAll)
        res.status(200).json(getAll);
    } catch (err) {
        console.log(err)
        res.json({ "err": err });
    }
});

//GET  method
router.post('/setAttendance', async (req, res) => {
    try {
        let records = req.body
        attendance.insertMany(records).then(() => {
            res.status(200).json({ success: true });
        })
    } catch (err) {
        res.json({ "err": err });
    }
});


router.get('/getAttendance', async (req, res) => {
    console.log('/getAttendance')
    try {
        const getAll = await attendance.find();
        console.log(getAll)
        res.status(200).json(getAll);
    } catch (err) {
        console.log(err)
        res.json({ "err": err });
    }
});

//BY id
router.get('/:id', async (req, res) => {
    try {
        const getbyID = await attendance.findById(req.params.id);
        res.status(200).json(getbyID);
    } catch (err) {
        res.json({ "err": err });
    }
});

//UPDATE method
router.put('/update', async (req, res) => {
    try {
        const updStu = await attendance.update({ _id: req.body._id }, {
            $set: {
                Date: req.body.Date,
                Regno: req.body.Regno,
                isPresent: req.body.isPresent,
                Department: req.body.Department,
                Year: req.body.Year
            }
        });
        res.status(200).json(updStu);
    } catch (err) {
        res.json({ "err": err });
    }

});
//DELETE methodrouter.put('/:id',async(req,res) => {
router.delete('/delete/:id', async (req, res) => {
    try {
        const delStu = await attendance.remove({ _id: req.params.id });
        res.status(200).json(delStu);
    } catch (err) {
        res.json({ "err": err });
    }
});
module.exports = router;