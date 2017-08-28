const RNG = require("./utils/RNG.js");
const newCreature = require("./newCreature.js");
const CreatureDb = require("../db/Creatures.json");
const creatures = Object.keys(CreatureDb);

function spawnCreature() {
  var creatureSpawned;

  var spawnRoll = [];
  // Rough random picker based on each creatures spawn chance
  for (let i in creatures) {
    // Multiplies their spawn chances by a random number
    spawnRoll[i] = RNG() * (CreatureDb[creatures[i]].attributes.spawnChance);
  }
  // Add a final value for no creatures spawning
  spawnRoll.push(RNG() * 2);

  // creatureIndex is the position in the creatures array
  var creatureIndex = 0;
  // indexValue is the value of that position in the spawnRoll array
  var indexValue = spawnRoll[creatureIndex];
  for (let i = 0; i < spawnRoll.length; i++) {
    if (spawnRoll[i] > indexValue) {
      // If the value of the next spawnRoll index is greater, change the creatureIndex to that creature
      creatureIndex = i;
    }
    indexValue = Math.max(indexValue, spawnRoll[i]);
  }
  if (creatureIndex === creatures.length) {
    creatureSpawned = CreatureDb["none"];
  } else {
    creatureSpawned = creatures[creatureIndex];
  }

  return creatureSpawned;
}

function genMap(sideLength) {
  var mapSize = sideLength * sideLength;
  var map = [];

  for (i = 0; i < mapSize; i++) {
    map[i] = {
      "playerIsHere": false,
      "creature": [],
      "items": [],
      "structures": []
    };
  }

  // Place player on a random tile in the map
  map[(Math.round(RNG(mapSize-1)))].playerIsHere = true;

  // Generate up to one creature per tile
  for (i=0; i < mapSize; i++) {
    // Check to see if there is a creature on that tile, if not set to null
    var spawnedCreature = spawnCreature();
    if (spawnedCreature) {
      map[i].creature = newCreature(spawnedCreature);
    } else {
      map[i].creature = null;
    }
  }

  return map;
}

module.exports = genMap;
