const RNG = require("./utils/RNG.js");

function getDirection() {
  var random = RNG();
  var direction;

  if (random < 0.25) {
    direction = "north";
  } else if (random < 0.5) {
    direction = "south";
  } else if (random < 0.75) {
    direction = "east";
  } else {
    direction = "west";
  }

  return direction;
}

module.exports = getDirection;
