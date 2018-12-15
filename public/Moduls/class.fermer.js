
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

    chooseCell(num) {
        this.getNewCoordinates();
        return super.chooseCell(num);
    }

    mul() {
        var newCell = random(this.chooseCell(0));
        if (newCell && this.energy >= 19) {
            var newX = newCell[0];
            var newY = newCell[1]; //
            matrix[newY][newX] = new Fermer(newX, newY, 4);
        }
    }

    move() {
        if (this.acted == false) {
            var newCell = random(this.chooseCell(0));
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
                this.die();
            }

        }
    }
    eat() {
        if (this.acted == false) {

            var AnimalCord = random(this.chooseCell(3));

            if (AnimalCord && this.sarac == false) {
                var newX = AnimalCord[0];
                var newY = AnimalCord[1];

                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = new Grass(newX, newY, 1);


                this.x = newX;
                this.y = newY;
                this.energy++;

                if (this.energy >= 19) {
                    this.mul();
                    this.energy = 6;
                }
                this.acted = true;

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
