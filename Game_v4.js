const RNG = require("./src/utils/RNG.js");
const newPlayer = require("./db/Player.js");
const dimRNG = require("./src/utils/dimRNG.js");

var player = newPlayer();

console.log(player.name);


function goldDrop(creature) {
  var goldDropMiddleValue;
  goldDropMiddleValue = dimRNG(1,11,3.5) * creature.drops.gold.multiplier;
  console.log(goldDropMiddleValue);
}
