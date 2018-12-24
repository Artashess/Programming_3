var LivingCreature = require("./class.livingcreature");
var Grass = require("./class.grass");

module.exports = class Fermer extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 15;
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

    mul(matrix) {
        var newCell = random_items(this.chooseCell(0, matrix));
        if (newCell && this.energy >= 19) {
            var newX = newCell[0];
            var newY = newCell[1]; //
            matrix[newY][newX] = new Fermer(newX, newY, 4);
        }
    }

    move(matrix) {
        if (this.acted == false) {

            var newCell = random_items(this.chooseCell(0, matrix));
            if (newCell && this.sarac == false) {
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

            var AnimalCord = random_items(this.chooseCell(random_items(3), matrix));

            if (AnimalCord && this.sarac == false) {
                var newX = AnimalCord[0];
                var newY = AnimalCord[1];

                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = new Grass(newX, newY, 1);


                this.x = newX;
                this.y = newY;
                this.energy++;

                if (this.energy >= 19) {
                    this.mul(matrix);
                    this.energy = 6;
                }
                this.acted = true;

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