function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var dragon = {
  totalHP: 0,
  currentHP: 0,
  attackType: "",
  missAttack: 0,
  breathAttack: getRandomInt(8,35),
  maulAttack: getRandomInt(1,12)
}

var player = {
  totalHP: 100,
  currentHP: totalHP,
  experience: 0,
  attackChance: Math.round(Math.random()),
  dragonsSlain: 0,
  damgage: getRandomInt(1, 4500)
}

function spawnDragon() {
  dragon.totalHP = getRandomInt(15000, 50000);
  dragon.currentHP = dragon.totalHP;
}
