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
        console.log(self.name)
    }
    this.showStats=function(){
        console.log (`Name: ${this.name}, Health: ${this.health}, Speed: ${getSpeed()}, Strength: ${getStrength()}`)
    }



}

var ninja1 = new Ninja("Hyabusa");
ninja1.sayName();
ninja1.showStats();