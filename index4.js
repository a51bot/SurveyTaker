//	Customization
var appPort = 3000;

//Libs
var express = require('express'), app = express();
var http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);
  var fs = require('fs');


var jade = require('jade');
// var io = require('socket.io').listen(app);
var pseudoArray = ['admin']; //block the admin username (you can disable it)

// Views Options
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set("view options", { layout: false });

app.use(express.static(__dirname + '/public'));

// Render and send the main page
app.get('/', function(req, res){
  res.render('index.jade');
});
server.listen(appPort);
// app.listen(appPort);
console.log("Server listening on port " + appPort);

// Handle the socket.io connections
io.sockets.on('connection', function (socket) { // init connection
	socket.on('message', function (data) { // Broadcast the message to all

	});
	socket.on('disconnect', function () {

	});
	socket.on("objectTable", function (objectsFromTable) {

        // we received a tweet from the browser
        var timeStamp = new Date().toJSON();
        var str = JSON.stringify(objectsFromTable);
        //var obj = JSON.parse(str);
        objectInMem = objectsFromTable;

        fs.writeFileSync('./dataStorage/array-'+timeStamp+'.txt',str,'utf-8');

        console.info(objectsFromTable);
    });

	socket.on('requestSubmitted',function(r){
        fs.readdir('./dataStorage/', function(err, items) {
        console.log("Sending To Client: "+items);
    /*
            var objectList;
            for (var i=0; i<items.length; i++) {
            	objectList += items[i];
            }
     */
        socket.emit("requestSubmitted", items);
        });
    });
});