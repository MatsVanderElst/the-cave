//Site used for sounds: https://quicksounds.com/search/filter/tracks/sword

class Game {
    scenes = [];
    currentSceneIndex = 0;
    currentScene;
    sceneListener;

    constructor() {}

    addScene(scene) {
        this.scenes.push(scene);
    }

    makeChoice(description) {
        for (let i = 0; i < this.currentScene.choices.length; i++) {  
            const choice = this.currentScene.choices[i];
            if (choice.description === description) {
                // play choice sound              ===============>> huidige sound
                choice.playChoiceSound();

                //moveuser to the next scene     ============ =>>> volgende vieuw door :nextScene  ====> Dus verkeerde audio?
                this.moveTo(choice.nextScene);

                //update what user sees via listener
                this.sceneListener(this.currentScene);

                // TODO: play the choice sound   ============== =>>> huidige sound
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
                this.sceneListener(this.currentScene);
                return;
            }
        }
        console.log(`didn't find scene for scene id "${sceneId}", check scenario!`)

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

    addAnimation(image, ease) {
        this.animations.push(new Animation(image, ease));
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
    constructor(image, ease) {
        this.image = image;
        this.ease = ease;
    }
}

const testClasses = () => {
    game = new Game();
    startScene = new GameScene("start", "you wake up in a cave", "dragon");
    //add choices
    startScene.addChoice("fight", "fightScene", "swordSwing");
    startScene.addChoice("run", "runningScene", "runningAway");
    game.addScene(startScene);

    fightScene = new GameScene("fightScene", "You're fighting");
    game.addScene(fightScene);

    //should give warning, there is no scene with id "bruh"
    game.moveTo("bruh");

    //start the game
    game.moveTo("start");


    //test makeChoice function

    game.makeChoice("fight");


}

const init = () => {
    testClasses();
    
}