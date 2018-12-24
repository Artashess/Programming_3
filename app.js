var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("./public"));

app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000);

var grass = require("./Moduls/class.grass");
var grasseater = require("./Moduls/class.grasseater");
var Animal = require("./Moduls/class.animal");
var Fermer = require("./Moduls/class.fermer");
var ice = require("./Moduls/class.ice");
var matrix = require("./Moduls/matrix.js");
console.log(matrix)

io.on('connection', function (socket) {
    socket.emit("matrix", matrix);

    setInterval(function(){
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[0].length; x++) {
                if (matrix[y][x].index == 1) {
                    matrix[y][x].mul(matrix);
                }
                else if (matrix[y][x].index == 2) {
                    matrix[y][x].eat(matrix);
                }
                else if (matrix[y][x].index == 3) {
                    matrix[y][x].eat(matrix);
                }
                else if (matrix[y][x].index == 4) {
                    matrix[y][x].eat(matrix);
                }
                else if (matrix[y][x].index == 5) {
                    matrix[y][x].freeze(matrix);
                }
            }
        }
        io.sockets.emit("matrix", matrix);
    }, 1000);
});

function frameRate(frameCount)
{
    return 1000 / frameCount;
}