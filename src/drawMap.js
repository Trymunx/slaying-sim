const mapGen = require("./mapGen.js");

// Creates an ASCII version of the map
function drawMap (map) {
  // Work out side length
  var sideLength = Math.sqrt(map.length);

  // Add horizontal borders, top border padded with a leading space,
  //  bottom padded with leading and trailing pipe
  var horizBorderLength = (2 * sideLength) + 3;
  // Vertical borders are the same as the side length

  // Add array to hold each line of the drawn map
  var drawnMap = [];
  drawnMap.length = sideLength + 3;

  // Top border begins with a space
  var topBorder = " ";
  for (let i = 0; i < horizBorderLength; i++) {
    topBorder += "_";
  }
  drawnMap[0] = topBorder;

  // Second line is always spaces padded with pipes
  var secondLine = "|";
  for (let i = 0; i < horizBorderLength; i++) {
    secondLine += " ";
  }
  drawnMap[1] = secondLine + "|";

  // Bottom border is always underscores padded with pipes
  var bottomBorder = "|";
  for (let i = 0; i < horizBorderLength; i++) {
    bottomBorder += "_";
  }
  drawnMap[(drawnMap.length - 1)] = bottomBorder + "|";

  // Gets the creature healthBar character
  var mapCreatures = [];
  for (var i = 0; i < sideLength; i++) {
    for (let j = (i * sideLength); j < ((i + 1) * sideLength); j++) {
      if (j % sideLength === 0) {
        if (map[j].playerIsHere) {
          mapCreatures[i] = "* ";
        } else if (map[j].creature !== null) {
          mapCreatures[i] = map[j].creature.attributes.healthBar + " ";
        } else {
          mapCreatures[i] = "· ";
        }
      } else {
        if (map[j].playerIsHere) {
          mapCreatures[i] += "* ";
        } else if (map[j].creature !== null) {
          mapCreatures[i] += map[j].creature.attributes.healthBar + " ";
        } else {
          mapCreatures[i] += "· ";
        }
      }
    }
  }

  // Each line should print a pipe, then two spaces, then creatures on
  //  each grid space with a space inbetween, then two spaces and a final
  //  pipe (e.g. |  s o x  |)
  for (let i = 0; i < sideLength; i++) {
    drawnMap[i+2] = "|  " + mapCreatures[i] + " |";
  }

  for (let i in drawnMap) {
    console.log(drawnMap[i]);
  }

}

module.exports = drawMap;
