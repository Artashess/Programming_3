var n = 80;
var m = 80;
var side = 10;
var i = 0;
var matrix;
var number = false;
var img;
var stat;
var grassColor = "green";
var season;

function setup() {
    frameRate(10);
    createCanvas(n * side + 650, 600);
    background('White');
    noLoop();
    img = loadImage("./backgroundforStat.jpg");
    
}
function draw() {
    textSize(12);
    if (number) {
        if(season == "Spring"){
            grassColor = "#2EFE2E";
        }
        if(season == "Summer"){
            grassColor = "Green";
        }
        if(season == "Autumn"){
            grassColor = "#80FF00";
        }
        if(season == "Winter"){
            grassColor = "#81F781";
        }
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x].index == 1) {
                    fill(grassColor);
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
        image(img,matrix[0].length * side,0,img.width/3,600);
    fill("Green");
    rect(matrix[0].length * side + 70, 30, side, side);
    text("Grass: " + stat.Grass + " | Die: " + stat.Eated_Grass + " | Born: " + stat.Added_Grass , matrix[0].length * side + 80 + side, 30 + side);
    fill("#DDD719");
    rect(matrix[0].length * side + 70, 60, side, side);
    text("GrassEater: " + stat.GrassEater + " | Die: " + stat.Died_GrassEater  + "  Born: " + stat.Added_GrassEater , matrix[0].length * side + 80 + side, 60 + side);
    fill("Red");
    rect(matrix[0].length * side + 70, 90, side, side);
    text("Animal: " + stat.Animal + " | Die: " + stat.Died_Animal + " | Born: " + stat.Added_Animal , matrix[0].length * side + 80 + side, 90 + side);
    fill("brown");
    rect(matrix[0].length * side + 70, 120, side, side);
    text("Fermer: " + stat.Fermer + " | Die: " + stat.Died_Fermer + " | Born: " + stat.Added_Fermer , matrix[0].length * side + 80 + side, 120 + side); 
    fill("blue");
    rect(matrix[0].length * side + 70, 150, side, side);
    text("ice: " + stat.ice + " | Die: " + stat.Died_ice +  " | Born: "+ stat.Added_ice , matrix[0].length * side + 80 + side, 150 + side);

    textSize(30);
    fill("black");
    text(season,n * side + img.width/7,img.height/5);
    
    }
    else {
        number = true
    }
    

 
} 
    var socket = io();
    socket.on("matrix", function (data) {
        matrix = data[0];
        stat = data[1];
        season = data[2];
        redraw();
    })

