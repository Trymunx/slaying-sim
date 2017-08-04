function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hitpointReport(playerHP) {
  if (playerHP <= 0) {
    console.log("You have been slain.");
    console.log("You slayed " + dragonsSlain + " dragons.");
  } else {
    console.log("You have " + playerHP + "HP remaining.");
    playerHPBar(playerHP);
  }
}

function getDragonAttack() {
  var attack = 0;
    //getDragonHit = 50% chance
    //getDragonAttackType = 25% breath, 75% maul
  if (Math.random() < 0.75) {
    attack = 0; //No attack
  } else if (Math.random() < 0.25) {
    attack = 1; //Breath
  } else {
    attack = 2; //Maul
  }
  return attack;
}

function getDragonBreathDamage() {
  return getRandomInt(3, 40);
}

function getDragonMaulDamage() {
  return getRandomInt(1, 5);
}

function playerHPBar(playerHP) {
  var hitpointsPercent = Math.round(playerHP);
  var barLength = Math.round(0.6 * hitpointsPercent);
  var emptyLength = 60 - barLength;
  var bar = "";
  for (i = 0; i < barLength; i++) {
    bar += "|"
  }
  for (i = 0; i < emptyLength; i++) {
    bar += " "
  }
  console.log("[" + bar + "] (" + hitpointsPercent + "%)");
}

function dragonHPBar(dragonHP, dragonTotalHP) {
  var hitpointsPercent = Math.round((dragonHP / dragonTotalHP) * 100);
  var barLength = Math.round(0.6 * hitpointsPercent);
  var emptyLength = 60 - barLength;
  var bar = "";
  for (i = 0; i < barLength; i++) {
    bar += "#"
  }
  for (i = 0; i < emptyLength; i++) {
    bar += " "
  }
  console.log("[" + bar + "] (" + hitpointsPercent + "%)");
}

function playerAttack() {
}

function main(playerHP) {
  
  // Spawns a dragon
  var dragonTotalHP = getRandomInt(15000, 50000);
  var dragonHP = dragonTotalHP;

  console.log("The dragon approaches, it has " + dragonHP + "HP.");
  console.log("It roars as you advance to attack it.");
  
  while(playerHP > 0){
    // Player attacks
    // Player has 65% chance of hitting.
    if(Math.random() < 0.65) {
        // Player damage is a random int from 1 to 2500
        var damage = getRandomInt(1, 2500);
        if (Math.random() < 0.9) {
          console.log("You swing your sword and hit the dragon for " +
           damage + "HP.");
        } else {
          console.log("You kick the dragon and do " + damage + " damage.");
        }
        dragonHP -= damage;
        if(dragonHP <= 0) {
            console.log("The dragon lies slain at your feet. Before you " +
              "can rest, you see the glinting wings of another.");
            dragonsSlain++;
            break;
        } else {
          console.log("The dragon has " + dragonHP + "HP remaining.");
          dragonHPBar(dragonHP, dragonTotalHP);
        }
    } else {
        if (Math.random() < 1/3) {
          console.log("Your attack does no damage to the dragon.");
        } else if (Math.random() < 0.5) {
          console.log("Your attack glances off the dragon's scales.")
        } else {
          console.log("You miss the dragon.");
        }
        console.log("The dragon has " + dragonHP + "HP remaining.");
        dragonHPBar(dragonHP, dragonTotalHP);
    }
    
    // Dragon attacks
    var dragonAttack = getDragonAttack();
      if(dragonAttack < 1) { // Dragon missed.
        if (Math.random() < 0.35) {
          console.log("You raise your shield and block the dragon's attack.");
        } else if (Math.random() < 0.25) {
          console.log("You sidestep the dragon's attack.");
        } else {
          console.log("The dragon misses you.");
        }
        hitpointReport(playerHP);
      } else if(dragonAttack < 2) { // Dragon breath attack
        var dragonBreathDamage = getDragonBreathDamage();
        console.log("You raise your shield but the dragon breaths fire, " +
          "hitting you for " + dragonBreathDamage + "HP.");
        playerHP -= dragonBreathDamage;
        hitpointReport(playerHP);
      } else if(dragonAttack < 3) { // Dragon maul attack
        var dragonMaulDamage = getDragonMaulDamage();
        console.log("The dragon mauls you for " + dragonMaulDamage + "HP.");
        playerHP -= dragonMaulDamage;
        hitpointReport(playerHP);
      }
  }
  return playerHP;
}

var playerHP = 100;
var dragonsSlain = 0;

while((playerHP = main(playerHP)) > 0) {
  // What do I put here?
}