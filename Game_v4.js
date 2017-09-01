const RNG = require("./src/utils/RNG.js");
const newPlayer = require("./db/newPlayer.js");
const dimRNG = require("./src/utils/dimRNG.js");
const genMap = require("./src/mapGen.js");
const drawMap = require("./src/drawMap.js");
const movePlayer = require("./src/movePlayer.js");
const getPlayerPosition = require("./src/PlayerPosition.js");
const look = require("./src/Look.js");
const getDirection = require("./src/Direction.js");
const getLiveCreatures = require("./src/LiveCreatures.js");

// Create a new player
var player = newPlayer();
console.log(player.name);

// Keep playing until the player is dead
while (player.attributes.currentHP > 0) {

  // Generate a map for the player
  console.log("You awaken in a forest. Looking around, you see nothing but trees.");
  var map = genMap(Math.round(RNG(5,20)));
  var liveCreatures = getLiveCreatures(map);
  drawMap(map);

  // Generate a new map once all aggresive creatures are dead
  while (liveCreatures.aggresive > 0) {

    // If player is next to an aggressive creature, creature will attack
    playerPos = getPlayerPosition(map);
    currentCreature = map[playerPos].creature;
    if (currentCreature.attributes.aggressive === true) {
      player.attributes.currentHP = fight(currentCreature);
    } else if (currentCreature.attributes.aggressive === false) {
      console.log("The " + currentCreature + " looks harmless. You leave it alone.");
    } else {
      console.log("There's nothing but trees here!");
    }

    movePlayer(map, getDirection());
  }

  // Message before generating a new map
  console.log("You suddenly feel very peculiar. Your world turns hazy, then " +
                "things start to fade. You decide to rest your eyes for a while.");

}
