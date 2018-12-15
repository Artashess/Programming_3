var matrix = [];
var n = 80;
var m = 80;
var side = 10;
var i = 0;
function setup() {
    for (var y = 0; y < n; y++) {
        matrix[y] = [];
        for (var x = 0; x < m; x++) {
            matrix[y][x] = random([0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 4, 5]);
        }
    }
}
module.exports = matrix.js

for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 1) {
            matrix[y][x] = new Grass(x, y, 1);
        }
        else if (matrix[y][x] == 2) {
            matrix[y][x] = new GrassEater(x, y, 2);
        }
        else if (matrix[y][x] == 3) {
            matrix[y][x] = new Animal(x, y, 3);
        }
        else if (matrix[y][x] == 4) {
            matrix[y][x] = new Fermer(x, y, 4);
        }
        else if (matrix[y][x] == 5) {
            matrix[y][x] = new ice(x, y, 5);

        }

    }
}