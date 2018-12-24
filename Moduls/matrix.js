var matrix = [];
var H = 80;
var W = 80;

grassqanak = 400;
grasseaterqanak = 100;
animalqanak = 50;
fermerqanak = 50;
iceqanak = 10;

var Grass = require("./class.grass");
var GrassEater = require("./class.grasseater");
var Animal = require("./class.animal");
var Fermer = require("./class.fermer");
var ice = require("./class.ice");

// function matrixArray(rows, columns) {
//     var arr = new Array();
//     for (var i = 0; i < rows; i++) {
//         arr[i] = new Array();
//         for (var j = 0; j < columns; j++) {
//             arr[i][j] = Math.floor(Math.random()*(5-0))+0;
//         }
//     } 
//     return arr;
// }       
// var matrix = matrixArray(5, 3);

for (var y = 0; y < H; y++) {
    matrix[y] = [];
    for (var x = 0; x < W; x++) {
        matrix[y].push(0);
    }
}

while (grassqanak > 0) {
    var x = Math.floor(Math.random() * W);
    var y = Math.floor(Math.random() * H);
    if (matrix[y][x] == 0) {
        matrix[y][x] = new Grass(x, y, 1);
        grassqanak--;
    }

}

while (grasseaterqanak > 0) {
    var x = Math.floor(Math.random() * W);
    var y = Math.floor(Math.random() * H);
    if (matrix[y][x] == 0) {
        matrix[y][x] =  new GrassEater(x, y, 2);
        grasseaterqanak--;
    }
}

while (animalqanak > 0) {
    var x = Math.floor(Math.random() * W);
    var y = Math.floor(Math.random() * H);
    if (matrix[y][x] == 0) {
        matrix[y][x] = new Animal(x, y, 3);
        animalqanak--;
    }
}

while (fermerqanak > 0) {
    var x = Math.floor(Math.random() * W);
    var y = Math.floor(Math.random() * H);
    if (matrix[y][x] == 0) {
        matrix[y][x] = new Fermer(x, y, 4);
        fermerqanak--;
    }

}

while (iceqanak > 0) {
    var x = Math.floor(Math.random() * W);
    var y = Math.floor(Math.random() * H);
    if (matrix[y][x] == 0) {
        matrix[y][x] = new ice(x, y, 5);
        iceqanak--;
    }
}

module.exports = matrix;