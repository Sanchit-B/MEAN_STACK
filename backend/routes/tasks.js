const express = require('express');
const Task = require('../models/task.js');

const router = express.Router();

router.post(
  '',
  (req, res) => {
    const task = new Task({
      _id: req.body._id,
      title: req.body.title,
      stage: req.body.stage
    });

    task
    .save()
    .then((resp) => {
      res.status(201).json({
        message: "Post Saved Successfully!",
        task: resp
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error Occured"
      })
    })
  }
)

router.patch(
  '/:id',
  (req, res) => {
    let updateQuery;
    if (req.params.id) {
      const id = req.params.id;
      updateQuery = req.body;

      Task.findByIdAndUpdate(
        id, 
        updateQuery
      ).then(response => {
          res.status(200).json(response);
        })
        .catch(error => {
          res.status(500).json({
            message: `Updation for document Id: ${id} failed!`
          })
        })
        
    } else {
      res.status(500).json({
        message: `Invalid request Id!${id}`
      })
    }
  }
)

router.delete(
  '/:id',
  (req, res) => {
    
    Task
    .findByIdAndDelete(req.params.id)
    .then(response => {
      res.status(200).json({
        message: 'Deleted Successfully!'
      })
    }).catch(error => {
      res.status(500).json({
        message: 'Deletion failed!'
      })
    })

  }
)

router.get(
  '*',
  (req, res) => {
    if (req.params.id || req.query.id) {
      const id = req.params.id ? req.params.id : req.query.id;

      Task.findById(id)
      .then(resp => {
        res.status(200).json(resp);
      })
      .catch(error => {
        res.status(404).end();
      })
    } else if (req.query.search) {
      const search = req.query.search;
      Task.find({
        $or: [ {stage: search}, {_id: search} ]
      })
      .then(resp => {
        res.status(200).json(resp);
      })
      .catch(error => {
        res.status(404).end();
      });
    } else {
      Task.find()
      .then(resp => {
        res.status(200).json(resp);
      })
      .catch(error => {
        res.status(404).end();
      });
    }
  }
)


module.exports = router;
