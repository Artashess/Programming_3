var LivingCreature = require("./class.livingcreature");

module.exports = class Animal extends LivingCreature {
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
            [this.x + 2, this.y + 2]
        ];
    }

    chooseCell(num, matrix) {
        this.getNewCoordinates();
        return super.chooseCell(num, matrix);
    }

    mul(matrix, stat, currentSeason) {
        if(currentSeason == "Winter"){
            var needToMul = 11;
        }
        else if(currentSeason == "Spring"){
            var needToMul = 7;
        }
        var newCell = random_items(this.chooseCell(0, matrix));
        if (newCell && this.energy >= needToMul) {
            var newX = newCell[0];
            var newY = newCell[1]; 
            stat.Added_Animal++;
            matrix[newY][newX] = new Animal(newX, newY, 3);
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
            var GrassEaterCord = random_items(this.chooseCell(2, matrix));

            if (GrassEaterCord) {
                this.energy++;
                var newX = GrassEaterCord[0];
                var newY = GrassEaterCord[1];

                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;

                this.x = newX;
                this.y = newY;
                this.acted = true;
                if (this.energy >= 10) {
                    this.mul(matrix, stat, currentSeason);
                    this.energy = 4;
                }
                this.acted = false;
            }
            else {
                this.move(matrix, stat);
            }
        }
        else this.acted = false;
    }
    die(matrix, stat) {
        stat.Died_Animal++;
        matrix[this.y][this.x] = 0;
    }
}
function random_items(items) {
    return items[Math.floor(Math.random() * items.length)];
}