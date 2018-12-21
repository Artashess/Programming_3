var n = 80;
var m = 80;
var side = 10;
var i = 0;
var socket = io();

function setup()
{
    createCanvas(matrix[0].length * side, matrix.length * side);
    frameRate(5);
    noLoop();
}
function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x].index == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x].index == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
                matrix[y][x].acted = false;
            }
            else if (matrix[y][x].index == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
                matrix[y][x].acted = false;
            }
            else if (matrix[y][x].index == 4) {
                fill("brown");
                rect(x * side, y * side, side, side);
                matrix[y][x].acted = false;
                i++;
                
                if (i == 10) {
                    matrix[y][x].sarac = false;
                    i = 0;
                }
            }
            else if (matrix[y][x].index == 5) {
                fill("blue");
                rect(x * side, y * side, side, side);
                matrix[y][x].acted = false;


            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
        }
    }
}

socket.on('first matrix', function(mtx){
    matrix = mtx;
    console.log(matrix);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    socket.on("redraw", function(mtx){
        matrix = mtx;
        redraw();
    });
});
