var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  
  Room = require('./api/models/room'),
  //Song = require('./api/models/songModel'),
  //allSongs = require('./api/models/allSongModel'),
  
  
  bodyParser = require('body-parser');
  
//Connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/roomDB'); 



// Initialzie bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var roomRoute = require('./api/routes/roomRoute');
roomRoute(app); //register the song route



app.listen(port);
console.log('Server started on: ' + port);