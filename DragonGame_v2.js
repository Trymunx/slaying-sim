function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var dragon = {
  totalHP: 0,
  currentHP: 0,
  attackType: "",
  missAttack: 0,
  maulAttack: getRandomInt(1,12),
  breathAttack: getRandomInt(8,35),
  spawnDragon: spawnDragon,
}

var player = {
  totalHP: 100,
  currentHP: totalHP,
  experience: 0,
  attackChance: Math.round(Math.random()),
  dragonsSlain: 0,
  damgage: getRandomInt(1, 4500),
  potions: 5
}

function spawnDragon() {
  this.totalHP = getRandomInt(15000, 50000);
  this.currentHP = this.totalHP;
}

function getDragonAttackType {
  var attack = Math.random();
  if (attack < 0.5) {
    dragon.attackType = 0;
    var message = Math.random();
    switch(message){
      case (message < 0.35):
        console.log("You raise your shield and block the dragon's attack.");
        break;
      case (message < 0.60):
        console.log("You sidestep the dragon's attack.");
        break;
      default:
        console.log("The dragon's attack misses you.");
    }
  } else if (attack < 0.85) {
    dragon.attackType = 1;
    console.log("The dragon mauls you for " + dragon.maulAttack + " damage.");
  } else {
    dragon.attackType = 2;
    console.log("You raise your shield but the dragon breaths fire, hitting you for " + dragon.breathAttack + "HP.")
  }
}

function drinkPotion() {
  if (player.potions > 0) {
    player.currentHP += 20;
    player.potions -= 1;
    console.log("You drink a potion, restoring 20HP. You have " + player.potions + " potions remaining.");
  } else {
    console.log("You have no potions left to drink!");
  }
  console.log("You have " + player.currentHP + "HP remaining.");
}
