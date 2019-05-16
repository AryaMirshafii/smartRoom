'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var roomSchema = new Schema({
  roomTemperature: {
    type: Number,
    default: 0
    //required: 'Name the location'
  },
  visitor_status: {
    type: Boolean,
    default: false
  },
  lights_on: {
    type: Boolean,
    default: false
  },
  latitude: {
    type: Number,
    default: 0
  },
  longitude: {
    type: Number,
    default: 0
  },

})

module.exports = mongoose.model('Room1', roomSchema);