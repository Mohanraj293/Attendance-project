const express = require('express');
const router = express.Router();
const students = require('../Schema/StudentSchema');
const attendance = require('../Schema/AttendanceSchema');


//POST method
router.post('/', async (req, res) => {
    try {
        const postStudent = await new students({
            Name: req.body.Name,
            Regno: req.body.Regno,
            Department: req.body.Department,
            DOB: req.body.DOB,
            DOJ: req.body.DOJ,
            Gender: req.body.Gender,
            Section: req.body.Section
        });
        const saveStudent = await postStudent.save();
        res.status(200).json(saveStudent);
    } catch (err) {
        res.json({ "err": err });
    }
});

//GET  method
// router.get('/', async (req, res) => {
//     try {
//         const getAll = await students.find();
//         res.status(200).json(getAll);
//     } catch (err) {
//         res.json({ "err": err });
//     }
// });

//GET  method with filter
router.get('/', async (req, res) => {
    const query = req.query
    try {
        const getAll = await students.find(query);
        res.status(200).json(getAll);
    } catch (err) {
        res.json({ "err": err });
    }
});

// router.get('/attendance', async (req, res) => {
//     try {
//         const getAll = await attendance.find();
//         res.status(200).json(getAll);
//     } catch (err) {
//         res.json({ "err": err });
//     }
// });

//BY id
router.get('/:id', async (req, res) => {
    try {
        const getbyID = await students.findById(req.params.id);
        res.status(200).json(getbyID);
    } catch (err) {
        res.json({ "err": err });
    }
});

//UPDATE method
router.put('/update', async (req, res) => {
    try {
        const updStu = await students.update({ _id: req.body._id }, {
            $set: {
                Name: req.body.Name,
                Regno: req.body.Regno,
                Department: req.body.Department,
                DOB: req.body.DOB,
                DOJ: req.body.DOJ,
                Gender: req.body.Gender,
                Section: req.body.Section
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
        const delStu = await students.remove({ _id: req.params.id });
        res.status(200).json(delStu);
    } catch (err) {
        res.json({ "err": err });
    }
});
module.exports = router;