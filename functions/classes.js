class Game {
    steps = [];
    currentStepIndex = 0;
    currentStep;
    constructor() {
        
    }

    addStep(step) {
        this.steps.push(step);
    }

    makeChoice(description) {
        for (let i = 0; i < this.currentStep.choices.length; i++) {
            const choice = this.currentStep.choices[i];
            if (choice.description === description) {
                // TODO: play the choice sound
                
                this.moveTo(choice.nextStep);
                //TODO: update scene in html
                

            }
        }
    }

    moveTo(stepId) {
        for (let i = 0; i < this.steps.length; i++) {
            const step = this.steps[i];
            if (step.id === stepId) {
                this.currentStepIndex = i;
                this.currentStep = step;
                return;
            }
        }
        console.log(`didn't find step for step id "${stepId}", check scenario!`)

    }
}

class GameStep {
    //Dit zijn de intance-variables 
    id;
    choices = [];
    animations = [];
    storyLine = 'something iteresting happens for more than a minute...';
    
    constructor(id,storyLine) {
        this.id = id;
        this.storyLine = storyLine;
    }
    
    addChoice(description, nextStep) {
        this.choices.push(new Choice(description, nextStep));
    }

    addAnimation(image, ease) {
        this.animations.push(new Animation(image, ease));
    }
}

class Choice{
    description = 'you choose to ...'
    nextStep;

    constructor(description, nextStep) {
        this.description = description;
        this.nextStep = nextStep;
    }
}

class Animation{
    constructor(image, ease) {
        this.image = image;
        this.ease = ease;
    }
}

const testClasses = () => {
    game = new Game();
    startScene = new GameStep("start", [], [], "you wake up in a cave");
    //add choices
    startScene.addChoice("fight", "fightScene");
    startScene.addChoice("run", "runningScene");
    game.addStep(startScene);

    fightScene = new GameStep("fightScene", [], [], "You're fighting");
    game.addStep(fightScene);

    //should give warning, there is no step with id "bruh"
    game.moveTo("bruh");

    //start the game
    game.moveTo("start");


    //test makeChoice function
    game.makeChoice("fight")

}

const init = () => {
    testClasses();
}
init();