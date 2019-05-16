'use strict';


var mongoose1 = require('mongoose'),
Task = mongoose1.model('Room1');



exports.listRooms = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};



exports.createRoom = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.readRoom = function(req, res) {
  Task.findById(req.params.roomID, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.updateRoom = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.roomID}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.deleteRoom = function(req, res) {


  Task.remove({
    _id: req.params.roomID
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Room successfully deleted' });
  });
};