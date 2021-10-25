const buildScenario = () => {
  game = new Game(updateHTML);

  scene = new GameScene("start", "PG-13: Parents Strongly Cautioned, Some Material May Be Inappropriate for Children Under 13. This rating is a stronger caution for parents that content included may not be appropriate for children under 13 (pre-teen ages). This may include stronger language, extended violence against dragons or battle situations and potion-use.");
  scene.addChoice("Start Adventure", "caveScene", undefined);
  game.addScene(scene);

  /* scene = new GameScene("intro", "This is a choose your own adventure game, make the right choices and try to reach the end!", "introduction", "caveBackground");
  scene.addChoice("click here to begin", "caveScene", undefined);
  game.addScene(scene); */

  scene = new GameScene("caveScene", "you wake up in a misterious dark cave, 'How did i get here?' you ask yourself, When suddenly you hear a growl coming from the shadows...", "growl", "caveBackground");
  scene.addChoice("get up", "dragonScene", "dragonGrowl1");
  game.addScene(scene);


  scene = new GameScene("dragonScene", "A giant fire breathing dragon appears in front of you! what do you do?", "firebreathing", "caveBackground");
  scene.addChoice("fight", "fightScene", "dirtyDragon");
  scene.addChoice("run", "runningScene", "runningAway");
  scene.addAnimation("knight1", "expo", 3, 300); 
  scene.addAnimation("dragon1", "expo", 3, -300);
  game.addScene(scene);
  
  
  scene = new GameScene("fightScene", "You're fighting choose what weapon you want to use, HURRY!!!", undefined, "fightSceneBackground");
  scene.addChoice("sword", "swordScene", "swordSwing");
  scene.addChoice("magic", "axeScene", "swordSwing");
  scene.addAnimation("sword1", "expo", 3, 300); 
  scene.addAnimation("wand1", "expo", 3, -300);
  game.addScene(scene);
  
  
  scene = new GameScene("swordScene", "You pick up the heavy sword from the fallen knight, Quick! use it!");
  scene.addChoice("stab", "stabScene", "dragon");
  scene.addChoice("throw", "deathScene", "cursing");
  scene.addChoice("swing", "deathScene", "cursing");
  scene.addAnimation("knight1", "expo", 3, 300); 
  scene.addAnimation("dragon1", "expo", 3, -300);
  game.addScene(scene);
}

const init = () => {
  buildScenario();
  game.moveTo("start");
}

init();
