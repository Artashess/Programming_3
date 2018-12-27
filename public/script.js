var n = 80;
var m = 80;
var side = 10;
var i = 0;
var matrix;
var number = false;
var img;
var stat;

function setup() {
    frameRate(10);
    createCanvas(n * side + 650, 600);
    background('White');
    noLoop();
    img = loadImage("./bg.jpg");
    
}
function draw() {
    if (number) {
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
    else {
        number = true
    }
    image(img,matrix[0].length,0,img.width/3,600);
    fill("Red");
    rect(550, 30, side, side);
    text("Animal: " + stat.Animal + "(-" + stat.Died_Animal + ")" + "(+" + stat.Added_Animal + ")", 560 + side, 30 + side);
    fill("Green");
    rect(550, 60, side, side);
    text("Grass: " + stat.Grass + "(-" + stat.Eated_Grass + ")" + "(+" + stat.Added_Grass + ")", 560 + side, 60 + side);
    fill("brown");
    rect(550, 90, side, side);
    text("Fermer: " + stat.Fermer + "(-" + stat.Died_Fermer + ")" + "(+" + stat.Added_Fermer + ")", 560 + side, 90 + side);
    fill("Yellow");
    rect(550, 120, side, side);
    text("GrassEater: " + stat.GrassEater + "(-" + stat.GrassEater + ")" + "(+" + stat.Added_GrassEater + ")", 560 + side, 120 + side);
} 
    var socket = io();
    socket.on("matrix", function (data) {
        matrix = data[0];
        stat = data[1];
        redraw();
    })

