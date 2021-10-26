const buildScenario = () => {
  game = new Game(updateHTML);

  scene = new GameScene("start", "Make sure to enable your sound before clicking the button below");
  scene.addChoice("Start Adventure", "caveScene", undefined);
  game.addScene(scene);

  /* scene = new GameScene("intro", "This is a choose your own adventure game, make the right choices and try to reach the end!", "introduction", "caveBackground");
  scene.addChoice("click here to begin", "caveScene", undefined);
  game.addScene(scene); */

  scene = new GameScene("caveScene", "you wake up in a misterious dark cave, 'How did i get here?' you ask yourself, When suddenly you hear a growl coming from the shadows...", "growl", "caveBackground");
  scene.addChoice("get up", "dragonScene", "dragonGrowl1");
  game.addScene(scene);


  scene = new GameScene("dragonScene", "Suddenly a giant fire breathing dragon appears in front of you! what do you do?", "suddenly", "caveBackground");
  scene.addChoice("fight", "fightScene", "prepare");
  scene.addChoice("run", "runningScene", "going");
  scene.addAnimation("knight1", "expo", 3, 300); 
  scene.addAnimation("dragon1", "expo", 3, -300);
  game.addScene(scene);
  
  
  scene = new GameScene("fightScene", "You're fighting choose what weapon you want to use, HURRY!!!", "hurry", "caveBackground");
  scene.addChoice("sword", "swordScene", "swordSwing");
  scene.addChoice("magic", "axeScene", "swordSwing");
  scene.addAnimation("sword1", "expo", 3, 300); 
  scene.addAnimation("wand1", "expo", 3, -300);
  game.addScene(scene);
  
  
  scene = new GameScene("swordScene", "You pick up the heavy sword from the fallen knight, Quick! use it!", "pickup","caveBackground");
  scene.addChoice("stab", "stabScene", "stab");
  scene.addChoice("throw", "deathScene", "throw");
  scene.addChoice("swing", "deathScene", "stab");
  scene.addAnimation("knight1", "expo", 3, 300); 
  scene.addAnimation("dragon1", "expo", 3, -300);
  game.addScene(scene);

  scene = new GameScene("stabScene", "your stab wounded the dragon!but what is your next move?", "wounded", "caveBackground");
  scene.addChoice("stab again", "stabDeath", "stab");
  scene.addChoice("run away", "run2", "stab");
  scene.addAnimation("knight1", "expo", 3, 300); 
  scene.addAnimation("dragon2", "expo", 3, -300);
  game.addScene(scene);

  scene = new GameScene("stabDeath", "you thried to finish the job but allas... you couldn't...", "stabDeath", "caveBackground");
  scene.addChoice("find another way", "caveScene", "revive");
  scene.addAnimation("deadKnight", "expo", 3, 300);
  game.addScene(scene);

}

const init = () => {
  buildScenario();
  game.moveTo("start");
}

init();
