//Site used for sounds: https://quicksounds.com/search/filter/tracks/sword
const debugScenario = true;


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
                const audio = choice.playChoiceSound();
                
                //we have to wait untill audio file has been loaded to check duration
                if (audio) {
                    audio.onloadedmetadata = function () {
                        console.log(audio.duration);
                        const duration = audio.duration * 1000;
                        
                        //move user to the next scene when choice sound has played 
                        setTimeout(function () { game.moveTo(choice.nextScene); }, duration);
                    };    
                } else {
                    //no need to wait,no sound is playing
                    this.moveTo(choice.nextScene);
                }
                
            }
        }
    }

    moveTo(sceneId) {
        for (let i = 0; i < this.scenes.length; i++) {
            const scene = this.scenes[i];
            if (scene.id === sceneId) {
                this.currentSceneIndex = i;
                let oldScene = this.currentScene;
                this.currentScene = scene;

                //update what user sees via listener
                if (this.sceneListener) {
                    this.sceneListener(oldScene, this.currentScene);
                }
                //play the soundscape   
                this.currentScene.playSoundscape();
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
    background;

    constructor(id, storyLine, soundscape, background) {
        this.id = id;
        this.storyLine = storyLine;
        this.soundscape = soundscape;
        this.background = background;
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

    //plays sound and returns duration in miliseconds of played audio
    playChoiceSound() {
        if (this.choiceSound) {
            const audio = new Audio(`../assets/audio/${this.choiceSound}.mp3`);
            audio.play();
            
            return audio;
        }
        return undefined;
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

const updateHTML =  (oldScene, scene) => {

    //dissolve the old images (oldScene might be undefined)
    if (oldScene) {
        for (let i = 0; i < oldScene.animations.length; i++) {
            const animation = oldScene.animations[i];
            if (gsap) {
                gsap.to(`.${animation.cssClass}`, { duration: 6, opacity: 0, ease: animation.ease });
/*                 gsap.to(".gsap",{opacity:0, ease:"bounce"});
 */            }
        }
    }
    
    //description
    $sceneDescription = document.querySelector(".sceneDescription");
    $sceneDescription.innerHTML = scene.storyLine;
    
    //render the buttons for choices in the scene
    const buttons = scene.choices.map(choice => { return `<button class="btn" onclick="game.makeChoice('${choice.description}');">${choice.description}</button>` }).join("");
    $sceneButtons = document.querySelector(".button__container");
    $sceneButtons.innerHTML = buttons;
    
    
    // render buttons for easy debugging of scenario
    if (debugScenario) {
        const testButtons = game.scenes.map(scene => { return `<button class="btn" onclick="game.moveTo('${scene.id}');">${scene.id}</button>` }).join("");
        $testButtons = document.querySelector(".testButton__container");
        $testButtons.innerHTML = testButtons;
        
    }
    
    // change the background
    $container = document.querySelector(".animation__container");
    $container.style.backgroundImage=`url(../assets/img/${scene.background}.jpg)`;
    
    
    // render the images for the scene if neccecary
    if (scene.animations.length > 0) {
        const animations = scene.animations.map(animation => { return `<img class="${animation.cssClass}" alt="${animation.cssClass}" src="${animation.image}">` }).join("");
        $container.innerHTML = animations;
    }
    

    //animate the images
    for (let i = 0; i < scene.animations.length; i++) {
        const animation = scene.animations[i];
        if (gsap) {     
            gsap.to(`.${animation.cssClass}`, { duration: animation.duration, x: animation.x, ease: animation.ease});
        }
    }
    /* gsap.to(".dragon1", { duration: 3, x: -500, ease: "expo" }); */


}

