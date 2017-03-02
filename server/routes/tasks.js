var express = require('express');
var router = express.Router();

var Task = require('../models/task');

router
// get all tasks
.get('/', function(req, res) {
  Task.find({userId: req.decoded._doc._id}, function(err, tasks){
  	res.json(tasks);
  })
})

// get specific task specified by taskId
.get('/:id', function(req, res) {
  Task.findById(req.params.id, function(err, task){
  	res.json(task);
  })
})

//add new task
.post('/', function(req, res) {
  //console.log(req.body);
  var newTask = new Task({
    userId: req.body.userId,
    name: req.body.name,
    completed: req.body.completed,
  });

  newTask.save(function(err) {
    if (err) throw err;
    res.json({ success: true, message: 'Task added successfully!' });
  });
})

// delete task specified by taskId
.delete('/:id', function(req, res) {
    Task.remove({_id: req.params.id}, function(err) {
	  if (err) res.send(err);
	    
	    res.json({ success: true, message: 'Task deleted successfully!' });
  	});
})

// edit task specified by taskId
.put('/', function(req, res, next) {
  Task.findById(req.body._id, function(err, task) {
  if (err) res.send(err);
    task.name = req.body.name;
    task.completed = req.body.completed;

    task.save(function(err) {
        if (err) res.send(err);

        res.json({ success: true, message: 'Task updated successfully!' });
    });
  }); 
});

module.exports = router;
