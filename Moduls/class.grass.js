var LivingCreature = require("./class.livingcreature");

module.exports = class Grass extends LivingCreature{
    mul(matrix, stat) {
        this.multiply++;
        var vand = this.chooseCell(0, matrix);
        var newCell = random_item(this.chooseCell(0, matrix));
        if (newCell && this.multiply >= 8) {
            var newX = newCell[0];
            var newY = newCell[1];

            stat.Added_Grass++;
            matrix[newY][newX] = new Grass(newX, newY, 1);
            this.multiply = 0;
            
        }
    }
}
function random_item(items) {
    return items[Math.floor(Math.random() * items.length)];
}