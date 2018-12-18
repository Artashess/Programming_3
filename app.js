var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));
app.get('/', function (req, res) {
   res.redirect('index.html');
});
server.listen(3000);

var grass = require("./Moduls/class.grass");
var grasseater = require("./Moduls/class.grasseater");
var Animal = require("./Moduls/class.animal");
var Fermer = require("./Moduls/class.fermer");
var ice = require("./Moduls/class.ice");
 
var time = frameRate(5);
function frameRate(frameCount)
{
    return 1000 / frameCount;
}
function draw(){
    for(var i in grass)
    {
        grass[i].mul();

    }
    socket.emit("update matrix", matrix.js);
    console.log(matrix);
}
setInterval(draw, time);