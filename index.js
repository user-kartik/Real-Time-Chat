var express = require("express");
var app = express();
var server = require("http").createServer(app); // Create an HTTP server
var io = require("socket.io")(server); // Attach Socket.io to the HTTP server
var port = process.env.PORT || 3700;

// Set view of '/' end point
app.set('views', __dirname + '/views');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get('/', function(req, res){
    res.render("page");
});

// Use your public/chat.js file as a listener
app.use(express.static(__dirname + '/public'));

// Set up socket connection
io.on('connection', function (socket) {
    socket.emit('message', { message: 'Welcome to the Real Time Web Chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});

server.listen(port, function () {
    console.log('Node.js listening on port ' + port);
});
