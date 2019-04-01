function Ninja(name){
    this.self = this;
    this.name = name;
    this.health = 100;
    var speed = 3;
    var strength = 3;

    function getSpeed(){
        return speed
    }
    function getStrength(){
        return strength
    }
    this.sayName =function(){
        console.log(this.name)
    }
    this.showStats=function(){
        console.log (`Name: ${name}, Health: ${this.health}, Speed: ${getSpeed()}, Strength: ${getStrength()}`)
    }
    this.punch = function(target){
        target.getPunched(5)
        console.log(`${target.name} was punched by ${name} and lost 5 Health!`)
    }
    this.getPunched = function(damage){
        this.health -= damage;
        
    }


}

//var ninja1 = new Ninja("Hyabusa");
//ninja1.sayName();
//ninja1.showStats();

var blueNinja = new Ninja("Goemon");
var redNinja = new Ninja("Bill Gates");
redNinja.punch(blueNinja);
