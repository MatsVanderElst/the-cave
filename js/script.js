const buildScenario = () => {
  game = new Game(updateHTML);
  scene = new GameScene("start", "you wake up in a misterious dark cave, 'How did i get here?' you ask yourself, When suddenly you hear a growl coming from the shadows...", "morning", "caveBackground");
  scene.addChoice("start game", "dragonScene", "runningAway");
  game.addScene(scene);


  scene = new GameScene("dragonScene", "A giant fire breathing dragon appears in front of you! what do you do?", "dragonGrowl1", "caveBackground");
  scene.addChoice("fight", "fightScene", "swordSwing");
  scene.addChoice("run", "runningScene", "runningAway");
  scene.addAnimation("knight1", "expo", 3, 300); 
  scene.addAnimation("dragon1", "expo", 3, -300);
  game.addScene(scene);
  
  
  scene = new GameScene("fightScene", "You're fighting choose what weapon you want to use, HURRY!!!","dragonGrowl1", "fightSceneBackground");
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
