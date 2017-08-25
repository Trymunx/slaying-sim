"use strict"
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var player = {
  totalHP: 100,
  currentHP: 100,
  experience: 0,
  attackChance: 0,
  damage: 0,
  potions: 3,
  gold: 0,
  hasSlainCreature: false,
  hasSlainDragon: false,
  dragonsSlain: 0,
  creaturesSlain: [
    {
      name: "rat",
      namePlural: "rats",
      numberSlain: 0
    },
    {
      name: "wolf",
      namePlural: "wolves",
      numberSlain: 0,
    },
    {
      name: "troll",
      namePlural: "trolls",
      numberSlain: 0,
    },
    {
      name: "snake",
      namePlural: "snakes",
      numberSlain: 0,
    },
    {
      name: "ghost",
      namePlural: "ghosts",
      numberSlain: 0,
    },
    {
      name: "thief",
      namePlural: "thieves",
      numberSlain: 0,
    }
  ],
};

var dragon = {
  name: "dragon",
  maxTotalHP: 50000,
  minTotalHP: 15000,
  totalHP: 0,
  currentHP: 0,
  healthBar: "#",
  missChance: 0.2,
  attacks: [
    {
      name: "maul",
      chance: 0.85,
      minDamage: 12,
      maxDamage: 27,
      damage: 0,
      message: "The dragon mauls you, hitting you for "
    },
    {
      name: "breath",
      chance: 1,
      minDamage: 17,
      maxDamage: 42,
      damage: 0,
      message: "You raise you shield but the dragon breaths fire, hitting you for "
    }
  ],
  goldDropChance: 0.95,
  goldDropMultiplier: 1500,
  potionDropChance: 0.95,
  potionDropMultiplier: 5,
  spawnChance: 0.25,
  spawnMessage: "It roars and spreads its wings as you attack.",
  deathMessage: "With a deafening roar, the dragon lets out a final burst of flaming breath and falls, shaking the ground."
};

var rat = {
  name: "rat",
  maxTotalHP: 150,
  minTotalHP: 5,
  totalHP: 0,
  currentHP: 0,
  healthBar: "o",
  missChance: 0.5,
  attacks: [
    {
      name: "bite",
      chance: 0.85,
      minDamage: 1,
      maxDamage: 4,
      damage: 0,
      message: "The rat bites you for "
    },
    {
      name: "scratch",
      chance: 1,
      minDamage: 3,
      maxDamage: 6,
      damage: 0,
      message: "The rat scratches you, you lose "
    }
  ],
  goldDropChance: 0.1,
  goldDropMultiplier: 1,
  potionDropChance: 0.05,
  potionDropMultiplier: 1,
  spawnChance: 1,
  spawnMessage: "It squeaks and bares its teeth as you attack.",
  deathMessage: "With a squeal the rat dies."
};

var wolf = {
  name: "wolf",
  maxTotalHP: 400,
  minTotalHP: 25,
  totalHP: 0,
  currentHP: 0,
  healthBar: "Ø",
  missChance: 0.3,
  attacks: [
    {
      name: "bite",
      chance: 0.85,
      minDamage: 4,
      maxDamage: 8,
      damage: 0,
      message: "The wolf bites you for "
    },
    {
      name: "slash",
      chance: 1,
      minDamage: 6,
      maxDamage: 14,
      damage: 0,
      message: "The wolf rears up and slashes you, hitting for "
    }
  ],
  goldDropChance: 0.35,
  goldDropMultiplier: 24,
  potionDropChance: 0.3,
  potionDropMultiplier: 2,
  spawnChance: 0.85,
  spawnMessage: "It growls as you attack, its hackles raised.",
  deathMessage: "The wolf dies with a whine."
};

var troll = {
  name: "troll",
  maxTotalHP: 28000,
  minTotalHP: 6500,
  totalHP: 0,
  currentHP: 0,
  healthBar: "»",
  missChance: 0.2,
  attacks: [
    {
      name: "maul",
      chance: 0.85,
      minDamage: 7,
      maxDamage: 15,
      damage: 0,
      message: "The troll mauls you for "
    },
    {
      name: "savage",
      chance: 1,
      minDamage: 12,
      maxDamage: 27,
      damage: 0,
      message: "The troll rushes at you, knocking you off your feet and savaging you for "
    }
  ],
  goldDropChance: 0.75,
  goldDropMultiplier: 375,
  potionDropChance: 0.65,
  potionDropMultiplier: 3,
  spawnChance: 0.45,
  spawnMessage: "It roars incoherently as you attack, beating its chest.",
  deathMessage: "The troll bellows and keels over, dead."
};

var snake = {
  name: "snake",
  maxTotalHP: 50,
  minTotalHP: 10,
  totalHP: 0,
  currentHP: 0,
  healthBar: "s",
  missChance: 0.3,
  attacks: [
    {
      name: "constrict",
      chance: 0.65,
      minDamage: 2,
      maxDamage: 10,
      damage: 0,
      message: "The snake wraps itself around you, constricting you for "
    },
    {
      name: "bite",
      chance: 1,
      minDamage: 6,
      maxDamage: 18,
      damage: 0,
      message: "The snake bites you at lightning speed, hitting you for "
    }
  ],
  goldDropChance: 0.2,
  goldDropMultiplier: 9,
  potionDropChance: 0.35,
  potionDropMultiplier: 1,
  spawnChance: 0.9,
  spawnMessage: "It hisses and bares its fangs as you attack.",
  deathMessage: "The snake tries to slither away before curling up, dead."
};

var ghost = {
  name: "ghost",
  maxTotalHP: 100,
  minTotalHP: 1,
  totalHP: 0,
  currentHP: 0,
  healthBar: "~",
  missChance: 0.25,
  attacks: [
    {
      name: "fear",
      chance: 0.9,
      minDamage: 5,
      maxDamage: 12,
      damage: 0,
      message: "The ghost rears its spectral form, fearing you for "
    },
    {
      name: "magic",
      chance: 1,
      minDamage: 10,
      maxDamage: 22,
      damage: 0,
      message: "The ghost channels spectral energy into a magical attack that hits you for "
    }
  ],
  goldDropChance: 0.5,
  goldDropMultiplier: 45,
  potionDropChance: 0.3,
  potionDropMultiplier: 1,
  spawnChance: 0.65,
  spawnMessage: "You see its face contort in anger as you attack, swirling in and out of view.",
  deathMessage: "The ghost's form dissipates into the surroundings, released from the physical world."
};

var thief = {
  name: "thief",
  maxTotalHP: 200,
  minTotalHP: 75,
  totalHP: 0,
  currentHP: 0,
  healthBar: "¦",
  missChance: 0.05,
  attacks: [
    {
      name: "punch",
      chance: 0.65,
      minDamage: 1,
      maxDamage: 3,
      damage: 0,
      message: "The thief lashes out, punching you for "
    },
    {
      name: "kick",
      chance: 0.8,
      minDamage: 2,
      maxDamage: 7,
      damage: 0,
      message: "The thief kicks you, hitting you for "
    },
    {
      name: "headbutt",
      chance: 0.82,
      minDamage: 2,
      maxDamage: 6,
      damage: 0,
      message: "The thief suddenly lunges headfirst at you. He headbuts you for "
    },
    {
      name: "stab",
      chance: 1,
      minDamage: 6,
      maxDamage: 12,
      damage: 0,
      message: "The thief draws his dagger and lunges, stabbing you for "
    }
  ],
  goldDropChance: 0.8,
  goldDropMultiplier: 90,
  potionDropChance: 0.35,
  potionDropMultiplier: 2,
  spawnChance: 0.8,
  spawnMessage: "It makes a grab for your gold but you are too quick. It attacks you in anger.",
  deathMessage: "You strike the final blow, killing the thief. All of his possessions are yours now!"
};

var creatures = [
  dragon,
  rat,
  wolf,
  troll,
  snake,
  ghost,
  thief
];

function spawn(creature) {
  creature.totalHP = getRandomInt(creature.minTotalHP, creature.maxTotalHP);
  creature.currentHP = creature.totalHP;
  console.log("A " + creature.name + " approaches, with " + creature.totalHP + "HP.");
  console.log(creature.spawnMessage);
}

function chooseCreatureToSpawn() {
  var spawnRoll = [];
  // Rough random picker based on each creatures spawn chance
  for (let i = 0; i < creatures.length; i++) {
    // Multiplies their spawn chances by a random number
    spawnRoll[i] = Math.round(Math.random() * creatures[i].spawnChance * 1000);
  }
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
  return creatures[creatureIndex];
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
    potionDrop = Math.round(creature.potionDropMultiplier);
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

function endGameReport() {

    //Check for dragons slain
    if (player.hasSlainDragon) {
      if (player.dragonsSlain === 1) {
        console.log("You slayed a dragon.");
      } else if (player.dragonsSlain < 5) {
        console.log("You are a mighty warrior, you slayed " + player.dragonsSlain + " dragons!");
      } else { // dragonsSlain > 5
        console.log("Congratulations, you are a champion. You slayed " + player.dragonsSlain + " dragons!");
      }
    }
    // Check for other creatures slain
    if (player.hasSlainCreature === true) {
      var creaturesSlainOutput = [];
      for (let i = 0; i < player.creaturesSlain.length; i++) {
        creaturesSlainOutput += " " + player.creaturesSlain[i].numberSlain + " ";
        if (player.creaturesSlain[i].numberSlain === 1) {
          creaturesSlainOutput += player.creaturesSlain[i].name;
        } else {
          creaturesSlainOutput += player.creaturesSlain[i].namePlural;
        }
      }
      console.log("You slayed" + creaturesSlainOutput + " and earned " + player.gold + " gold.");
    } else {
      console.log("You failed to slay a single creature.");
    }
}

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
    var currentCreature = chooseCreatureToSpawn();
    spawn(currentCreature);
    creatureHPBar(currentCreature);
    console.log("");
    while(currentCreature.currentHP > 0 && player.currentHP > 0) {
      if (player.currentHP < 15) {
        if(player.potions > 0) {
          drinkPotion();
        } else {
          if (Math.random() < 0.5) {
            heal();
          } else {
            getPlayerAttack(currentCreature);
          }
        }
      } else {
        getPlayerAttack(currentCreature);
      }
      console.log("");
      if (currentCreature.currentHP > 0) {
        player.currentHP -= getCreatureAttack(currentCreature);
        playerHPReport(player.currentHP);
      }
      console.log("");
    }
  }
  endGameReport();
}

main();
