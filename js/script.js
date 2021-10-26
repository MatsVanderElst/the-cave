const buildScenario = () => {
  game = new Game(updateHTML);

  scene = new GameScene("start", "Make sure to enable your sound before clicking the button below");
  scene.addChoice("Start Adventure", "caveScene", undefined);
  game.addScene(scene);

  /* scene = new GameScene("intro", "This is a choose your own adventure game, make the right choices and try to reach the end!", "introduction", "caveBackground");
  scene.addChoice("click here to begin", "caveScene", undefined);
  game.addScene(scene); */

  scene = new GameScene("caveScene", "You wake up in a misterious dark cave, 'How did i get here?' you ask yourself, When suddenly you hear a growl coming from the shadows...", "growl", "caveBackground");
  scene.addChoice("Follow sound", "dragonScene", "dragonGrowl1");
  scene.addAnimation("knightnosword", "expo", 3, -300);
  game.addScene(scene);


  scene = new GameScene("dragonScene", "Suddenly a giant fire breathing dragon appears in front of you! what do you do?", "suddenly", "caveBackground");
  scene.addChoice("Fight", "fightScene", "prepare");
  scene.addChoice("Run", "runningScene", "going");
  scene.addAnimation("knight1", "expo", 3, 300); 
  scene.addAnimation("dragon1", "expo", 3, -300);
  game.addScene(scene);
  
  scene = new GameScene("fightScene", "You're fighting choose what weapon you want to use, HURRY!!!", "hurry", "caveBackground");
  scene.addChoice("Sword", "swordScene", "swordSwing");
  scene.addChoice("Magic", "magicScene", "magic");
  scene.addAnimation("sword1", "expo", 3, 300); 
  scene.addAnimation("wand1", "expo", 3, -300);
  game.addScene(scene);

  scene = new GameScene("magicScene", "You don't know much about magic, should you really drink this teleportation potion?", "magicdesc", "caveBackground");
  scene.addChoice("Use sword", "swordScene", "swordSwing");
  scene.addChoice("Drink potion", "magicScene", "drink");
  scene.addAnimation("sword1", "expo", 3, 300); 
  scene.addAnimation("potion", "expo", 3, -300);
  game.addScene(scene);
  
  
  scene = new GameScene("swordScene", "You pick up the heavy sword from the fallen knight, Quick! use it!", "pickup","caveBackground");
  scene.addChoice("Stab", "stabScene", "stab");
  scene.addChoice("Throw", "stabScene", "throw");
  scene.addAnimation("knight1", "expo", 3, 300); 
  scene.addAnimation("dragon1", "expo", 3, -300);
  game.addScene(scene);

  scene = new GameScene("stabScene", "Your sword wounded the dragon! but what is your next move?", "wounded", "caveBackground");
  scene.addChoice("Stab", "stabDeath", "stab");
  scene.addChoice("Run away", "runningScene", "going");
  scene.addAnimation("knight1", "expo", 3, 300); 
  scene.addAnimation("dragon2", "expo", 3, -300);
  game.addScene(scene);
  
  scene = new GameScene("stabDeath", "You tried to finish the job but alas... you couldn't...", "stabDeath", "caveBackground");
  scene.addChoice("Find another way", "caveScene", "revive");
  scene.addAnimation("deadKnight", "expo", 3, -300);
  game.addScene(scene);

  scene = new GameScene("runningScene", "You sprint away from the savage beast as you hear it growling away, but which way should you go?", "runafterstab", "splitBackground");
  scene.addChoice("Right", "doorScene", "going");
  scene.addChoice("Left", "leftScene", "herewego");
  game.addScene(scene);

  scene = new GameScene("doorScene", "You enter a large room with 3 doors, it looks familliar, wich door should you open?", "treedoorsdown", "doorsBackground");
  scene.addChoice("Door 1", "rightScene", "Door");
  scene.addChoice("Door 2", "middleScene", "Door");
  scene.addChoice("Door 3", "leftScene", "Door");
  scene.addAnimation("leftdoor", "expo", 3, -300);
  scene.addAnimation("middledoor", "expo", 3, 0); 
  scene.addAnimation("rightdoor", "expo", 3, 300); 
  game.addScene(scene);

  scene = new GameScene("rightScene", "You find yourself on a split with a familliar blue gem, which way do you go?", "bluegemdesc", "bluesplitbackground");
  scene.addChoice("Left", "middleScene", "herewego");
  scene.addChoice("Right", "doorScene", "going");
  game.addScene(scene);


  scene = new GameScene("middleScene", "You find yourself on a split with a red gem, which way do you go?", "redgemdesc", "redsplitbackground");
  scene.addChoice("Left", "rightScene", "herewego");
  scene.addChoice("Right", "doorScene", "going");
  game.addScene(scene);

  scene = new GameScene("leftScene", "Finally you see the light at the end of the tunnel, you made is out alive...", "exitdesc", "exitbackground");
  scene.addChoice("Find another way", "caveScene", "revive");
  scene.addAnimation("knight2", "expo", 3, -300); 
  game.addScene(scene);

}

const init = () => {
  buildScenario();
  game.moveTo("start");
}

init();
