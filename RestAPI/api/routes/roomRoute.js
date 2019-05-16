'use strict';
module.exports = function(app) {
  var room = require('../controllers/roomController');

  // todoList Routes
	app.route('/rooms')
    .get(room.listRooms)
    .post(room.createRoom);


	app.route('/rooms/:roomID')
    .get(room.readRoom)
    .put(room.updateRoom)
    .delete(room.deleteRoom);




    
};