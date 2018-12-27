var LivingCreature = require("./class.livingcreature");
var Grass = require("./class.grass");

module.exports = class Fermer extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 8;
        this.acted = false;
        this.sarac = false;
        this.saracCount = 0;

    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
            [this.x - 3, this.y - 3],
            [this.x - 2, this.y - 3],
            [this.x - 1, this.y - 3],
            [this.x, this.y - 3],
            [this.x + 1, this.y - 3],
            [this.x + 2, this.y - 3],
            [this.x + 3, this.y - 3],
            [this.x - 3, this.y - 2],
            [this.x + 3, this.y - 2],
            [this.x - 3, this.y - 1],
            [this.x + 3, this.y - 1],
            [this.x - 3, this.y],
            [this.x + 3, this.y],
            [this.x - 3, this.y + 1],
            [this.x + 3, this.y + 1],
            [this.x - 3, this.y + 2],
            [this.x + 3, this.y + 2],
            [this.x - 3, this.y + 3],
            [this.x - 2, this.y + 3],
            [this.x - 1, this.y + 3],
            [this.x, this.y + 3],
            [this.x + 1, this.y + 3],
            [this.x + 2, this.y + 3],
            [this.x + 3, this.y + 3]
        ];
    }

    chooseCell(num, matrix) {
        this.getNewCoordinates();
        return super.chooseCell(num, matrix);
    }

    mul(matrix, stat, currentSeason) {
        if(currentSeason == "Winter"){
            var needToMul = 13;
        }
        else if(currentSeason == "Spring"){
            var needToMul = 8;
        }
        var newCell = random_items(this.chooseCell(0, matrix));
        if (newCell && this.energy >= needToMul) {
            var newX = newCell[0];
            var newY = newCell[1]; 
            stat.Added_Fermer++;
            matrix[newY][newX] = new Fermer(newX, newY, 4);
        }
        else this.acted = false;
    }

    move(matrix, stat) {
        if (this.acted == false) {

            var newCell = random_items(this.chooseCell(0, matrix));
            if (newCell && this.sarac == false) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;

                this.x = newX;
                this.y = newY;           

            }
            this.energy--;
            if (this.energy <= 0) {
                this.die(matrix, stat);
            }
            this.acted = true;
        }
        else this.acted = false;
    }
    eat(matrix, stat, currentSeason) {
        if (this.acted == false) {

            var AnimalCord = random_items(this.chooseCell(random_items(3), matrix));

            if (AnimalCord && this.sarac == false) {
                var newX = AnimalCord[0];
                var newY = AnimalCord[1];

                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = new Grass(newX, newY, 1);


                this.x = newX;
                this.y = newY;
                this.energy++;

                if (this.energy >= 13) {
                    this.mul(matrix, stat, currentSeason);
                    this.energy = 0;
                }
                this.acted = true;
            }
            else {
                this.move(matrix, stat);
            }
        }
        else this.acted = false;
    }
    die(matrix, stat) {
        stat.Died_Fermer++;
        matrix[this.y][this.x] = 0;
    }
}
function random_items(items) {
    return items[Math.floor(Math.random() * items.length)];
}