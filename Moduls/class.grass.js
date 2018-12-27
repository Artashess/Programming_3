var LivingCreature = require("./class.livingcreature");

module.exports = class Grass extends LivingCreature{
    mul(matrix, stat, currentSeason) {
        if(currentSeason == "Winter"){
            var needToMul = 10;
        }
        else if(currentSeason == "Spring"){
            var needToMul = 5;
        }
        var vand = this.chooseCell(0, matrix);
        var newCell = random_item(this.chooseCell(0, matrix));
        this.multiply++;
        if(this.multiply >= needToMul){
            this.multiply = 0;
        if(newCell){
                var newX = newCell[0];
            var newY = newCell[1];

            stat.Added_Grass++;
            matrix[newY][newX] = new Grass(newX, newY, 1);
            
            }
        }

    }
}
function random_item(items) {
    return items[Math.floor(Math.random() * items.length)];
}