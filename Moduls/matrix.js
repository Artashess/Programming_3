grassqanak = 400;
grasseaterqanak = 100;
animalqanak = 50;
fermerqanak = 50;
iceqanak = 10;

function matrixArray(rows, columns) {
    var arr = new Array();
    for (var i = 0; i < rows; i++) {
        arr[i] = new Array();
        for (var j = 0; j < columns; j++) {
            arr[i][j] = Math.floor(Math.random()*(5-0))+0;
        }
    } 
    return arr;
}       
var matrix = matrixArray(5, 3);

console.log(matrix);
module.exports = matrix