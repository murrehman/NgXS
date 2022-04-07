const express = require('express');

const Employee = require('../models/employee.js');

const router = express.Router();

const ObjectId = require('mongoose').Types.ObjectId;

//get
router.get('/', (req, res) => {
    Employee.find((err, doc) => {
        if (err) {
            console.log('Error in get data' + err)
        } else {
            res.send(doc)
        }
    })
})


//get Single
router.get('/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        Employee.findById(req.params.id, (err, doc) => {
            if (err) {
                console.log('Error in Get employee by id' + err)
            } else {
                res.send(doc)
            }
        })
    } else {
        return res.status(400).send('No record found with id' + req.params.id)
    }
})


//post
router.post('/', (req, res) => {
    let emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        dept: req.body.dept
    })

    emp.save((err, doc) => {
        if (err) {
            console.log('Error in post data' + err)
        } else {
            res.send(doc)
        }
    })
})


//Put
router.put('/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {

        let emp = {
            name: req.body.name,
            position: req.body.position,
            dept: req.body.dept
        };


        Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
            if (err) {
                console.log('Error in Delete employee by id' + err)
            } else {
                res.send(doc)
            }
        })
    } else {
        return res.status(400).send('No record found with id' + req.params.id)
    }
})


//Delete Single
router.delete('/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        Employee.findByIdAndRemove(req.params.id, (err, doc) => {
            if (err) {
                console.log('Error in Delete employee by id' + err)
            } else {
                res.send(doc)
            }
        })
    } else {
        return res.status(400).send('No record found with id' + req.params.id)
    }
})

module.exports = router;