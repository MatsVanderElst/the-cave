//Site used for sounds: https://quicksounds.com/search/filter/tracks/sword

class Game {
    scenes = [];
    currentSceneIndex = 0;
    currentScene;
    sceneListener; // Javascript function that gets called when DOM needs to be changed
    constructor(sceneListener) {
        this.sceneListener = sceneListener;
    }

    // returns true if scene was succesfully added to the game
    addScene(sceneToAdd) {
        for (let i = 0; i < this.scenes.length; i++) {
            const existingScene = this.scenes[i];
            if (existingScene.id === sceneToAdd.id) {
                console.log(`WARNING!!! scene with id ${sceneToAdd.id} already exists!!!! The id must be unique`);
                return false;
            }
        }
        this.scenes.push(sceneToAdd);
        return true;
    }

    makeChoice(description) {
        for (let i = 0; i < this.currentScene.choices.length; i++) {  
            const choice = this.currentScene.choices[i];
            if (choice.description === description) {
                // play choice sound             
                choice.playChoiceSound();

                //moveuser to the next scene     
                this.moveTo(choice.nextScene);


                // TODO: play the choice sound   
                this.currentScene.playSoundscape();
            }
        }
    }

    moveTo(sceneId) {
        for (let i = 0; i < this.scenes.length; i++) {
            const scene = this.scenes[i];
            if (scene.id === sceneId) {
                this.currentSceneIndex = i;
                this.currentScene = scene;
                //update what user sees via listener
                if (this.sceneListener) {
                    this.sceneListener(this.currentScene);
                }
                return true;
            }
        }
        console.log(`didn't find scene for scene id "${sceneId}", check scenario!`);
        return false;

    }
    // method to register a function to call when a scene changes
    setSceneListener(sceneListener) {
        this.sceneListener = sceneListener;
    }
}

class GameScene {
    //Dit zijn de intance-variables 
    id;
    choices = [];
    animations = [];
    storyLine = 'something iteresting happens for more than a minute...';
    soundscape;

    constructor(id, storyLine, soundscape) {
        this.id = id;
        this.storyLine = storyLine;
        this.soundscape = soundscape;
    }

    addChoice(description, nextScene, choiceSound) {
        this.choices.push(new Choice(description, nextScene, choiceSound));
    }

    addAnimation(image, ease, duration, x) {
        this.animations.push(new Animation(image, ease, duration, x));
    }

    playSoundscape() {
        if (this.soundscape) {
            const audio = new Audio(`../assets/audio/${this.soundscape}.mp3`);
            audio.loop = false; //==> TODO: check om zachter te spelen
            audio.play();
        }
    }

}

class Choice {
    description = 'you choose to ...'
    nextScene;
    choiseSound;

    constructor(description, nextScene, choiceSound) {
        this.description = description;
        this.nextScene = nextScene;
        this.choiceSound = choiceSound;
    }
    playChoiceSound() {
        if (this.choiceSound) {
            const audio = new Audio(`../assets/audio/${this.choiceSound}.mp3`);
            audio.play();
        }
    }
}


class Animation {
    constructor(name, ease, duration, x) {
        this.cssClass = name;
        this.image = `assets/img/${name}.png`;
        this.ease = ease;
        this.duration = duration;
        this.x = x;
    }
}

const updateHTML = (scene) => {
    //description
    $sceneDescription = document.querySelector(".sceneDescription");
    $sceneDescription.innerHTML = scene.storyLine;

    //render the buttons for choices in the scene
    const buttons = scene.choices.map(choice => { return `<button class="btn" onclick="game.makeChoice('${choice.description}');">${choice.description}</button>` }).join("");
    $sceneButtons = document.querySelector(".button__container");
    $sceneButtons.innerHTML = buttons;

    // render the images for the scene if neccecary
    if (scene.animations.length > 0) {
        const animations = scene.animations.map(animation => { return `<img class="${animation.cssClass}" alt="${animation.cssClass}" src="${animation.image}">` }).join("");
        $container = document.querySelector(".animation__container");
        $container.innerHTML = animations;
    }

    //animate the images
    for (let i = 0; i < scene.animations.length; i++) {
        const animation = scene.animations[i];
        gsap.to(`.${animation.cssClass}`, { duration: animation.duration, x: animation.x, ease: animation.ease});
    }
    /* gsap.to(".dragon1", { duration: 3, x: -500, ease: "expo" }); */
}

const testClasses = () => {
    game = new Game(updateHTML);
    scene = new GameScene("start", "you wake up in a cave", "dragon");
    
    //add choices
    scene.addChoice("fight", "fightScene", "swordSwing");
    scene.addChoice("run", "runningScene", "runningAway");
    scene.addAnimation("knight1", "expo", 3, 300); 
    scene.addAnimation("dragon1", "expo", 3, -300);
    game.addScene(scene);
    
    
    scene = new GameScene("fightScene", "You're fighting choose what weapon you want to use, HURRY!!!");
    scene.addChoice("Sword", "swordScene", "swordSwing");
    scene.addChoice("Axe", "axeScene", "swordSwing");
    game.addScene(scene);
    
    
    scene = new GameScene("swordScene", "You pick up the heavy sword from the fallen knight, Quick! use it!");
    scene.addChoice("stab", "stabScene", "dragon");
    scene.addChoice("throw", "deathScene", "cursing");
    scene.addChoice("swing", "deathScene", "cursing");
    game.addScene(scene);
    
    //should return false because scene id's must be uniqe
    if (game.addScene(new GameScene("start","this Scene should be rejected by the game"))) {
        return; // Gosh darnit, we have a failed test
    }

    //should return false, there is no scene with id "bruh"
    if (game.moveTo("bruh") === true) {
        return;// Gosh darnit, we have a failed test
    }
    

    //start the game, schould return true
    if (game.moveTo("start") === false) {
        return;// Gosh darnit, we have a failed test
    }

}

const init = () => {
    testClasses();
    
}