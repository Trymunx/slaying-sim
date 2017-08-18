function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var dragon = {
  totalHP: 0,
  currentHP: 0,
  missAttack: 0,
  maulAttack: 0,
  breathAttack: 0,
  spawnDragon: spawnDragon,
}

var player = {
  totalHP: 100,
  currentHP: 100,
  experience: 0,
  attackChance: 0,
  dragonsSlain: 0,
  damgage: 0,
  potions: 5
}

function spawnDragon() {
  this.totalHP = getRandomInt(15000, 50000);
  this.currentHP = this.totalHP;
}

function getDragonAttack() {
  var attack = Math.random();
  var damage = 0;
  if (attack < 0.6) {
    var message = Math.random();
    if(message < 0.35){
      console.log("You raise your shield and block the dragon's attack.");
    } else if (message < 0.60) {
      console.log("You sidestep the dragon's attack.");
    } else {
      console.log("The dragon's attack misses you.");
    }
  } else if (attack < 0.92) {
    dragon.maulAttack = getRandomInt(1,12);
    console.log("The dragon mauls you for " + dragon.maulAttack + " damage.");
    damage = dragon.maulAttack;
  } else {
    dragon.breathAttack = getRandomInt(8,35);
    console.log("You raise your shield but the dragon breaths fire, hitting you for " + dragon.breathAttack + "HP.");
    damage = dragon.breathAttack;
  }
  return damage;
}

function getPlayerAttack() {
  player.attackChance = Math.random();
  if (player.attackChance > 0.4) {
    player.damage = getRandomInt(1, 4500);
    dragon.currentHP -= player.damage;
    console.log("You attack the dragon for " + player.damage + "HP.");
  } else {
    console.log("You miss the dragon. It has " + dragon.currentHP + "HP remaining.");
  }
  dragonHPReport(dragon.currentHP);
}

function dragonHPReport(dragonHP) {
  if (dragonHP > 0) {
    console.log("It has " + dragonHP + "HP remaining.");
    dragonHPBar(dragonHP, dragon.totalHP);
  } else {
    console.log("You have slain the dragon. You have " + player.currentHP + "HP remaining.");
    player.dragonsSlain += 1;
  }
}

function dragonHPBar(currentHP, totalHP) {
  var totalBarLength = 2*(Math.round(totalHP / 1000))
  var hitpointsPercent = Math.round((currentHP / totalHP) * 100);
  var barLength = Math.round((totalBarLength / 100) * hitpointsPercent);
  var emptyLength = totalBarLength - barLength;
  var bar = "";
  for (i = 0; i < barLength; i++) {
    bar += "#"
  }
  for (i = 0; i < emptyLength; i++) {
    bar += " "
  }
  console.log("[" + bar + "] (" + hitpointsPercent + "%)");
}

function playerHPReport(playerHP) {
  if (playerHP > 0) {
    console.log("You have " + playerHP + "HP remaining.");
    playerHPBar(playerHP);
  } else {
    console.log("You have been slain.");
  }
}

function playerHPBar(playerHP) {
  var barLength = Math.round(0.6 * playerHP);
  var emptyLength = 60 - barLength;
  var bar = "";
  for (i = 0; i < barLength; i++) {
    bar += "|"
  }
  for (i = 0; i < emptyLength; i++) {
    bar += " "
  }
  console.log("[" + bar + "] (" + playerHP + "%)");
}

function endGameReport(dragonsSlain) {
  if (dragonsSlain === 0) {
    console.log("You didn't slay a single dragon.");
  } else if (dragonsSlain === 1) {
    console.log("You managed to slay a dragon.");
  } else if (dragonsSlain < 5) {
    console.log("You are a mighty warrior, you slayed " + dragonsSlain + " dragons!");
  } else { // dragonsSlain > 5
    console.log("Congratulations, you are a champion. You slayed " + dragonsSlain + " dragons!");
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
  playerHPReport(player.currentHP);
}

function heal() {
  var healing = getRandomInt(1, 8);
  player.currentHP += healing;
  console.log("You tend to your wounds as best you can, healing " + healing + "HP.");
  playerHPReport(player.currentHP);
}

// function getPlayerChoice() {
//   var playerChoice = prompt("What would you like to do? Type ATTACK to attack, DRINK to drink a potion or " +
//     "HEAL to restore a small amount of HP.".toUpperCase());
//   switch (playerChoice) {
//     case "ATTACK":
//       getPlayerAttack();
//       break;
//     case "DRINK":
//       drinkPotion();
//       break;
//     case "HEAL":
//       heal();
//       break;
//     default:
//       console.log("Please enter either ATTACK, DRINK or HEAL in full.");
//       playerChoice = prompt("What would you like to do? Type ATTACK to attack, DRINK to drink a potion or " +
//         "HEAL to restore a small amount of HP.").toUpperCase();
//       break;
//   }
// }

function main() {
  while (player.currentHP > 0) {
    dragon.spawnDragon();
    console.log("A dragon approaches with " + dragon.totalHP + "HP.");
    dragonHPBar(dragon.currentHP, dragon.totalHP);
    console.log("");
    while(dragon.currentHP > 0 && player.currentHP > 0) {
      if (player.currentHP < 15) {
        if(player.potions > 0) {
          drinkPotion();
        } else {
          if (Math.random() < 0.5) {
            heal();
          } else {
            getPlayerAttack();
          }
        }
      } else {
        getPlayerAttack();
      }
      console.log("");
      if (dragon.currentHP > 0) {
        player.currentHP -= getDragonAttack();
        playerHPReport(player.currentHP);
      }
      console.log("");
    }
  }
  endGameReport(player.dragonsSlain);
}

main();
