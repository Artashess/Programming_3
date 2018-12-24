var LivingCreature = require("./class.livingcreature");

module.exports = class Animal extends LivingCreature{
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 10;
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

    mul(matrix) {
        var newCell = random_items(this.chooseCell(0, matrix));
        if (newCell && this.energy >= 12) {
            var newX = newCell[0];
            var newY = newCell[1]; //
            matrix[newY][newX] = new Animal(newX, newY, 3);
        }
    }

    move(matrix) {
        if (this.acted == false) {
            var newCell = random_items(this.chooseCell(0, matrix));
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;

                this.x = newX;
                this.y = newY;
                this.acted = true;


            }
            this.energy--;
            if (this.energy <= 0) {
                this.die(matrix);
            }
        }
        else this.acted = false;        
    }
    eat(matrix) {
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
                if (this.energy >= 12) {
                    this.mul(matrix);
                    this.energy = 7;
                }
            }
            else {
                this.move(matrix);
            }
        }
    }
    die(matrix) {
        matrix[this.y][this.x] = 0;
    }
}
function random_items(items) {
    return items[Math.floor(Math.random() * items.length)];
}