class Ninja{
    constructor(name) {
        this.name = name;
        this.health = 100;
        this.speed = 3;
        this.strength = 3;
    }
    sayName() {
        console.log(name)
    }

    showStats(){
        console.log (`Name: ${this.name}, Health: ${this.health}, Speed: ${this.speed}, Strength: ${this.strength}`)
    }

    drinkSake() {
        this.health += 10
    }
}

var blueNinja = new Ninja("Goemon");
var redNinja = new Ninja("Bill Gates");
blueNinja.showStats()
redNinja.showStats()

redNinja.drinkSake()
redNinja.showStats()
blueNinja.showStats()