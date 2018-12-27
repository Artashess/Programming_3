var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("./public"));
app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000);

var matrix = require("./Moduls/matrix.js");
var fs = require('fs');

var stat = {
    "Animal": 0,
    "Grass": 0,
    "Fermer": 0,
    "GrassEater": 0,
    "ice":0,
    "Died_Animal": 0,
    "Died_ice": 0,
    "Eated_Grass": 0,
    "Died_Fermer": 0,
    "Died_GrassEater": 0,
    "Added_Animal": 0,
    "Added_Grass": 0,
    "Added_ice": 0,
    "Added_Fermer": 0,
    "Added_GrassEater": 0
}
io.on('connection', function (socket) {
    socket.emit("matrix", [matrix, stat]);

    setInterval(function(){
        stat.Grass = 0;
        stat.GrassEater = 0;
        stat.Animal = 0;
        stat.Fermer = 0;
        stat.ice = 0;

        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[0].length; x++) {
                if (matrix[y][x].index == 1) {
                    matrix[y][x].mul(matrix, stat);
                    stat.Grass++;
                }
                else if (matrix[y][x].index == 2) {
                    matrix[y][x].eat(matrix, stat);
                    stat.GrassEater++;
                }
                else if (matrix[y][x].index == 3) {
                    matrix[y][x].eat(matrix, stat);
                    stat.Animal++;
                }
                else if (matrix[y][x].index == 4) {
                    matrix[y][x].eat(matrix, stat);
                    stat.Fermer++;
                }
                else if (matrix[y][x].index == 5) {
                    matrix[y][x].freeze(matrix, stat);
                    stat.ice++;
                }
            }
        }
        
        var myJson = JSON.stringify(stat);
        fs.writeFileSync("stat.json", myJson);

        io.sockets.emit("matrix", [matrix, stat]);
    }, 1000);
});

function frameRate(frameCount)
{
    return 1000 / frameCount;
}