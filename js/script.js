const buildScenario = () => {
  game = new Game(updateHTML);

  scene = new GameScene("start", "Make sure to enable your sound before clicking the button below");
  scene.addChoice("Start Adventure", "caveScene", undefined);
  game.addScene(scene);

  /* scene = new GameScene("intro", "This is a choose your own adventure game, make the right choices and try to reach the end!", "introduction", "caveBackground");
  scene.addChoice("click here to begin", "caveScene", undefined);
  game.addScene(scene); */

  scene = new GameScene("caveScene", "you wake up in a misterious dark cave, 'How did i get here?' you ask yourself, When suddenly you hear a growl coming from the shadows...", "growl", "caveBackground");
  scene.addChoice("follow sound", "dragonScene", "dragonGrowl1");
  scene.addAnimation("knightnosword", "expo", 3, -300);
  game.addScene(scene);


  scene = new GameScene("dragonScene", "Suddenly a giant fire breathing dragon appears in front of you! what do you do?", "suddenly", "caveBackground");
  scene.addChoice("Fight", "fightScene", "prepare");
  scene.addChoice("Run", "runningScene", "going");
  scene.addAnimation("knight1", "expo", 3, 300); 
  scene.addAnimation("dragon1", "expo", 3, -300);
  game.addScene(scene);
  
  scene = new GameScene("fightScene", "You're fighting choose what weapon you want to use, HURRY!!!", "hurry", "caveBackground");
  scene.addChoice("sword", "swordScene", "swordSwing");
  scene.addChoice("magic", "magicScene", "magic");
  scene.addAnimation("sword1", "expo", 3, 300); 
  scene.addAnimation("wand1", "expo", 3, -300);
  game.addScene(scene);

  scene = new GameScene("magicScene", "you don't know much about magic, should you really drink this teleportation potion?", "magicdesc", "caveBackground");
  scene.addChoice("use sword", "swordScene", "swordSwing");
  scene.addChoice("drink potion", "magicScene", "drink");
  scene.addAnimation("sword1", "expo", 3, 300); 
  scene.addAnimation("potion", "expo", 3, -300);
  game.addScene(scene);
  
  
  scene = new GameScene("swordScene", "You pick up the heavy sword from the fallen knight, Quick! use it!", "pickup","caveBackground");
  scene.addChoice("stab", "stabScene", "stab");
  scene.addChoice("throw", "stabScene", "throw");
  scene.addAnimation("knight1", "expo", 3, 300); 
  scene.addAnimation("dragon1", "expo", 3, -300);
  game.addScene(scene);

  scene = new GameScene("stabScene", "your sword wounded the dragon! but what is your next move?", "wounded", "caveBackground");
  scene.addChoice("stab", "stabDeath", "stab");
  scene.addChoice("run away", "runningScene", "going");
  scene.addAnimation("knight1", "expo", 3, 300); 
  scene.addAnimation("dragon2", "expo", 3, -300);
  game.addScene(scene);
  
  scene = new GameScene("stabDeath", "you thried to finish the job but allas... you couldn't...", "stabDeath", "caveBackground");
  scene.addChoice("find another way", "caveScene", "going");
  scene.addAnimation("deadKnight", "expo", 3, 300);
  game.addScene(scene);

  scene = new GameScene("runningScene", "You sprint away from the savage beast as you hear it growling away, but which way should you go?", "runafterstab", "splitBackground");
  scene.addChoice("right", "doorScene", "going");
  scene.addChoice("left", "leftScene", "left");
  game.addScene(scene);

  scene = new GameScene("doorScene", "You enter a large room with 3 doors, it looks familliar, wich door should you open?  ?", "treedoorsdown", "doorsBackground");
  scene.addChoice("right door", "rightScene", "Door");
  scene.addChoice("middle door", "middleScene", "Door");
  scene.addChoice("left door", "leftScene", "Door");
  scene.addAnimation("leftdoor", "expo", 3, -300);
  scene.addAnimation("middledoor", "expo", 3, 0); 
  scene.addAnimation("rightdoor", "expo", 3, 300); 
  game.addScene(scene);

  scene = new GameScene("rightScene", "you find yourself on a split with a familliar blue gem, which way do you go?", "bluegemdesc", "bluesplitbackground");
  scene.addChoice("left", "middleScene", "herewego");
  scene.addChoice("right", "doorScene", "going");
  game.addScene(scene);


  scene = new GameScene("middleScene", "you find yourself on a split with a red gem, which way do you go?", "redgemdesc", "redsplitbackground");
  scene.addChoice("left", "rightScene", "herewego");
  scene.addChoice("right", "doorScene", "going");
  game.addScene(scene);

  scene = new GameScene("leftScene", "Finally you see the light at the end of the tunnel, you made is out alive...", "exitdesc", "exitbackground");
  scene.addChoice("find another way", "caveScene", "going");
  scene.addAnimation("knight2", "expo", 3, -300); 
  game.addScene(scene);


  /* throwScene */

}

const init = () => {
  buildScenario();
  game.moveTo("start");
}

init();
