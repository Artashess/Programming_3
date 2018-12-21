var LivingCreature = require("./class.livingcreature");

module.exports = class GrassEater extends LivingCreature{
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 8;
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

    chooseCell(num) {
        this.getNewCoordinates();
        return super.chooseCell(num);
    }

    mul() {
        var newCell = random(this.chooseCell(0));
        if (newCell && this.energy >= 10) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = new GrassEater(newX, newY, 2);

        }
    }

    move() {
        if (this.acted == false) {
            var newCell = random(this.chooseCell(0));
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;

                this.x = newX;
                this.y = newY;
                this.acted = true;

                this.energy--;
                if (this.energy <= 0) {
                    this.die();
                }
            }
        }
    }
    eat() {
        if (this.acted == false) {
            var GrassCord = random(this.chooseCell(1));

            if (GrassCord) {
                this.energy++;
                var newX = GrassCord[0];
                var newY = GrassCord[1];

                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;

                this.x = newX;
                this.y = newY;
                this.acted = true;
                if (this.energy >= 10) {
                    this.mul();
                    this.energy = 3;
                }
            }
            else {
                this.move();
            }
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
    }
}
