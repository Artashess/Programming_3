var LivingCreature = require("./class.livingcreature");

module.exports = class GrassEater extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 7;
        this.acted = false;
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
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(num, matrix) {
        this.getNewCoordinates();
        return super.chooseCell(num, matrix);
    }

    mul(matrix, stat, currentSeason) {
        if(currentSeason == "Winter"){
            var needToMul = 10;
        }
        else if(currentSeason == "Spring"){
            var needToMul = 5;
        }
        var newCell = random_items(this.chooseCell(0, matrix));
        if (newCell && this.energy >= needToMul) {
            var newX = newCell[0];
            var newY = newCell[1];
            stat.Added_GrassEater++;
            matrix[newY][newX] = new GrassEater(newX, newY, 2);

        }
        else this.acted = false;
    }

    move(matrix, stat) {
        if (this.acted == false) {
            var newCell = random_items(this.chooseCell(0, matrix));
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;

                this.x = newX;
                this.y = newY;
                     
                if (this.energy <= 0) {
                    this.die(matrix, stat);
                }
                this.acted = true;
            }
            this.energy--;

        }
        else this.acted = false;
    }
    eat(matrix, stat, currentSeason) {
        if (this.acted == false) {
            var GrassCord = random_items(this.chooseCell(1, matrix));

            if (GrassCord) {
                this.energy++;
                var newX = GrassCord[0];
                var newY = GrassCord[1];

                stat.Eated_Grass++;
                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;

                this.x = newX;
                this.y = newY;
                
                if (this.energy >= 10) {
                    this.mul(matrix, stat, currentSeason);
                    this.energy = 2;
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
        stat.Died_GrassEater++;
        matrix[this.y][this.x] = 0;
    }
}
function random_items(items) {
    return items[Math.floor(Math.random() * items.length)];
}