var LivingCreature = require("./class.livingcreature");

module.exports = class Grass extends LivingCreature{
    mul(matrix) {
        this.multiply++;
        var vand = this.chooseCell(0);
        var newCell = vand[Math.floor(Math.random() * vand.length)];//poxel math functions

        if (newCell && this.multiply >= 8) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = new Grass(newX, newY, 1);
            this.multiply = 0;
            
        }
        return matrix;
    }
}
