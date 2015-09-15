var http = require('http');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var app     = express();
var port=3000;

//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true })); 


// NEVER use a Sync function except at start-up!
index = fs.readFileSync(__dirname + '/index.html');

// Send index.html to all requests
var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

// Socket.io server listens to our app
var io = require('socket.io').listen(app);

var objectInMem= null;

io.sockets.on('connection', function(socket) {
  
    socket.on("objectTable", function (objectsFromTable) {
        // we received a tweet from the browser

        var timeStamp = new Date().toJSON();
        var str = JSON.stringify(objectsFromTable);
        //var obj = JSON.parse(str);
        objectInMem = objectsFromTable;

        fs.writeFileSync('./dataStorage/array-'+timeStamp+'.txt',str,'utf-8');

        console.info(objectsFromTable);
    });

    
});




app.listen(port);
console.log("Server Listening on "+port);










/*
To read the object back from a file

var p = new Foo();
p.Bar = "Terry"
var s = JSON.stringify(p)
// write s to file, get => { "Bar" : "Terry" }
// read s from file and turn back into an object:
var p = JSON.parse(s);
*/


//DEPRICATED CODE
/*
//app.use(express.bodyParser());
app.post('/submit', function(req, res) {
  res.send('You sent the name "' + req.body.notes + '".');
  //res.send("<html> <a href=finalout>Results</a> </html>"); //doesnt show up??

  res.render('viewProfile', {notes: req.body.notes, sex: req.body.sex});
  
  console.log("NOTE: "+ req.body.notes+".\n");
  console.log("Sex:"+req.body.sex);
  //console.log("Female:"+req.body.sex);

});

*/

/*
app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});

//send the html and javascript
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/index.html'));
});
//send the html and javascript
app.get('/clientapp.js', function(req, res){
  res.sendFile(path.join(__dirname + '/clientapp.js'));
});
*/