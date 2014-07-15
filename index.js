var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('user connected');
  socket.on('chat message', function(msg){
    console.log(msg);
    io.emit('chat message', msg);
    var i = 0;
    while(true) {
      i++;
      var rando = Math.random();
      console.log(rando);
      if (rando > 0.9) {
        io.emit('chat message', "1/" + i + " of the time, it works every time.");
        break;
      } 
    }
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});