class Game {
    scenes = [];
    currentSceneIndex = 0;
    currentScene;
    constructor() {}

    addScene(scene) {
        this.scenes.push(scene);
    }

    makeChoice(description) {
        for (let i = 0; i < this.currentScene.choices.length; i++) {
            const choice = this.currentScene.choices[i];
            if (choice.description === description) {
                // TODO: play the choice sound
                this.currentScene.playSoundscape();

                this.moveTo(choice.nextScene);
                //TODO: update scene in html


            }
        }
    }

    moveTo(sceneId) {
        for (let i = 0; i < this.scenes.length; i++) {
            const scene = this.scenes[i];
            if (scene.id === sceneId) {
                this.currentSceneIndex = i;
                this.currentScene = scene;
                return;
            }
        }
        console.log(`didn't find scene for scene id "${sceneId}", check scenario!`)

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

    addChoice(description, nextScene) {
        this.choices.push(new Choice(description, nextScene));
    }

    addAnimation(image, ease) {
        this.animations.push(new Animation(image, ease));
    }

    playSoundscape() {
        if (this.soundscape) {
            const audio = new Audio(`../assets/audio/${this.soundscape}.mp3`);
            audio.loop = true;
            audio.play();
        }
    }

}

class Choice {
    description = 'you choose to ...'
    nextScene;

    constructor(description, nextScene) {
        this.description = description;
        this.nextScene = nextScene;
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
    startScene.addChoice("fight", "fightScene");
    startScene.addChoice("run", "runningScene");
    game.addScene(startScene);

    fightScene = new GameScene("fightScene", "You're fighting");
    game.addScene(fightScene);

    //should give warning, there is no scene with id "bruh"
    game.moveTo("bruh");

    //start the game
    game.moveTo("start");


    //test makeChoice function
    game.makeChoice("fight")

}

const init = () => {
    testClasses();
}