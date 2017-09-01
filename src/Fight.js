// const CreatureDb = require("../db/Creatures.json");
// const creatures = Object.keys(CreatureDb);
const RNG = require("./src/utils/RNG.js");
const dimRNG = require("./src/utils/dimRNG.js");



function fight (creature) {



  while(creature.currentHP > 0 && player.currentHP > 0) {
    if (player.currentHP < 15) {
      if(player.potions > 0) {
        drinkPotion();
      } else {
        if (Math.random() < 0.5) {
          heal();
        } else {
          getPlayerAttack(creature);
        }
      }
    } else {
      getPlayerAttack(creature);
    }
    console.log("");
    if (currentCreature.currentHP > 0) {
      player.currentHP -= getCreatureAttack(creature);
      playerHPReport(player.currentHP);
    }
    console.log("");
  }

  return player.attributes.currentHP;
}

module.exports = fight;

// OLD CODE FROM V3. NEEDS UPDATING

function drinkPotion() {
  if (player.potions > 0) {
    player.currentHP += 50;
    player.potions -= 1;
    console.log("You drink a potion, restoring 50HP. You have " + player.potions + " potions remaining.");
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
  for (let i = 0; i < barLength; i++) {
    bar += "|"
  }
  for (let i = 0; i < emptyLength; i++) {
    bar += " "
  }
  console.log("[" + bar + "] (" + playerHP + "%)");
}

function creatureHPBar(creature) {
  var totalBarLength;
  var hitpointsPercent = Math.round((creature.currentHP / creature.totalHP) * 100);
  var barLength;
  var emptyLength;
  var bar = "";

  if (creature.totalHP <= 1000) { // Weaker creatures need HP bars that aren't 0 length
    totalBarLength = Math.round(Math.sqrt(creature.totalHP) * 3.5);
    barLength = Math.round((totalBarLength / 100) * hitpointsPercent);
    emptyLength = totalBarLength - barLength;
  } else { // Is a dragon or a troll so use cube root instead of square root
    totalBarLength = Math.round(Math.cbrt(creature.totalHP) * 3.25);
    barLength = Math.round((totalBarLength / 100) * hitpointsPercent);
    emptyLength = totalBarLength - barLength;
  }

  for (let i = 0; i < barLength; i++) {
    bar += creature.healthBar;
  }

  for (let i = 0; i < emptyLength; i++) {
    bar += " "
  }

  console.log("[" + bar + "] (" + hitpointsPercent + "%)");
}

function creatureDrop(creature) {
  var goldDrop;
  var goldDropMiddleValue;
  var goldDropLowerBound;
  var goldDropUpperBound;
  if (Math.random() <= creature.goldDropChance) {
    // Multiple of creatures' gold drop multiplier from 1x to 11x the multiplier
    goldDropMiddleValue = Math.round(creature.goldDropMultiplier * (Math.random() + 0.1) * 10);
    // Lower bound is middle value - 10%
    goldDropLowerBound = goldDropMiddleValue - (goldDropMiddleValue * 0.1);
    // Upper bound is middle value + 10%
    goldDropUpperBound = goldDropMiddleValue + (goldDropMiddleValue * 0.1);
    // Gold drop is a random value between the bounds (rounded in case 10% is not an integer)
    goldDrop = Math.round(getRandomInt(goldDropLowerBound, goldDropUpperBound));
    player.gold += goldDrop;
  } else {
    goldDrop = false;
  }
  var potionDrop;
  if (Math.random() <= creature.potionDropChance) {
    potionDrop = Math.round(getRandomInt(1, creature.potionDropMultiplier));
    player.potions += potionDrop;
  } else {
    potionDrop = false;
  }
  if (goldDrop === false && potionDrop === false) {
    console.log("The " + creature.name + " doesn't drop anything.");
  } else if (potionDrop === false) {
    console.log("The " + creature.name + " drops " + goldDrop + " gold.");
  } else if (goldDrop === false) {
    console.log("The " + creature.name + " drops " + potionDrop + (potionDrop === 1 ? " potion." : " potions."));
  } else {
    console.log("The " + creature.name + " drops " + goldDrop + " gold and " + potionDrop + (potionDrop === 1 ? " potion." : " potions."));
  }
}

function getCreatureAttack(creature) {
  var attackChance = Math.random();
  var damage;
  if (attackChance <= creature.missChance) {
    var message = Math.random();
    if(message < 0.35){
      console.log("You raise your shield and block the " + creature.name + "'s attack.");
    } else if (message < 0.60) {
      console.log("You sidestep the " + creature.name + "'s attack.");
    } else {
      console.log("The " + creature.name + "'s attack misses you.");
    }
    damage = 0;
  } else if (attackChance <= creature.attacks[0].chance) { // Creature's first attack hits
    creature.attacks[0].damage = getRandomInt(creature.attacks[0].minDamage, creature.attacks[0].maxDamage);
    console.log(creature.attacks[0].message + creature.attacks[0].damage + "HP.");
    damage = creature.attacks[0].damage;
  } else { // Creature's second attack hits
  creature.attacks[1].damage = getRandomInt(creature.attacks[1].minDamage, creature.attacks[1].maxDamage);
  console.log(creature.attacks[1].message + creature.attacks[1].damage + "HP.");
  damage = creature.attacks[1].damage;
  }
  return damage;
}

function getPlayerAttack(creature) {
  player.attackChance = Math.random();
  if (player.attackChance > 0.4) {
    player.damage = getRandomInt(1, 30);
    creature.currentHP -= player.damage;
    console.log("You attack the " + creature.name + " for " + player.damage + "HP.");
  } else {
    console.log("You miss the " + creature.name + ".");
  }
  creatureHPReport(creature, creature.currentHP, creature.totalHP);
}

function creatureHPReport(creature) {
  if (creature.currentHP > 0) {
    console.log("It has " + creature.currentHP + "HP remaining.");
    creatureHPBar(creature);
  } else {
    console.log("You have slain the " + creature.name + ". You have " + player.currentHP + "HP remaining.");
    player.hasSlainCreature = true;
    creatureSlain(creature);
  }
}

function creatureSlain(creature) {
  if (creature === "dragon") {
    player.dragonsSlain++;
  } else {
    for (let i = 0; i < creatures.length; i++) {
      if (creatures[i] === creature) {
        player.creaturesSlain[i-1].numberSlain++;
      }
      // for (var j in player.creaturesSlain) {
      //   if (player.creaturesSlain[j].name === creatures[i]) {
      //     player.creaturesSlain[j].numberSlain++;
      //     break;
      //   }
    }
  }
  creatureDrop(creature);
}














// function goldDrop(creature) {
//   var goldDropMiddleValue;
//   goldDropMiddleValue = dimRNG(1,11,3.5) * creature.drops.gold.multiplier;
//   console.log(goldDropMiddleValue);
// }
