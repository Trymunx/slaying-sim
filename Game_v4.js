const RNG = require("./src/utils/RNG.js");
const newPlayer = require("./db/newPlayer.js");
const dimRNG = require("./src/utils/dimRNG.js");
const genMap = require("./src/mapGen.js");
const drawMap = require("./src/drawMap.js");
const movePlayer = require("./src/movePlayer.js");
const getPlayerPosition = require("./src/PlayerPosition.js");
const look = require("./src/Look.js");

var player = newPlayer();

console.log(player.name);

console.log("Generating a map: ...");
var map = genMap(Math.round(RNG(5,20)));
drawMap(map);
// Test move command
movePlayer(map, "north");




// function goldDrop(creature) {
//   var goldDropMiddleValue;
//   goldDropMiddleValue = dimRNG(1,11,3.5) * creature.drops.gold.multiplier;
//   console.log(goldDropMiddleValue);
// }``
