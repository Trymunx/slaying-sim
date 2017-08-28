function getPlayerPosition(map) {
  var position;
  for (let i = 0; i < map.length; i++) {
    if (map[i].playerIsHere) {
      position = i;
      break;
    }
  }
  return position;
}

function movePlayer(map, direction) {
  var sideLength = Math.sqrt(map.length);

  var playerPos = getPlayerPosition(map);
  var oldPlayerPos = playerPos;

  switch(direction) {
    case "north":
      if (playerPos - sideLength < 0) {
        console.log("You can't move any further North!");
      } else {
        playerPos -= sideLength;
      }
      break;
    case "south":
      if (playerPos + sideLength > map.length) {
        console.log("You can't move any further South!");
      } else {
        playerPos += sideLength;
      }
      break;
    case "east":
      if ((playerPos + 1) % sideLength === 0) {
        console.log("You can't move any further East!");
      } else {
        playerPos++;
      }
      break;
    case "west":
      if (playerPos % sideLength === 0) {
        console.log("You can't move any further West!");
      } else {
        playerPos--;
      }
      break;
    default:
      console.log("Direction not found. Please enter north, south, east or west.");
      break;
    }

  // Move player to the new position
  map[oldPlayerPos].playerIsHere = false;
  map[playerPos].playerIsHere = true;
}

module.exports = movePlayer;
