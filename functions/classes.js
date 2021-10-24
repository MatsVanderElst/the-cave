class Game {
    steps = [];
    currentStepIndex = 0;
    constructor() {
        
    }

    addStep(step) {
        this.steps.push(step);
    }

    moveTo(stepId) {
        for (let i = 0; i < this.steps.length; i++) {
            const step = this.steps[i];
            if (step.id === stepId) {
                this.currentStepIndex = i;
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
        choices.push(new Choice(description, nextStep));
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
    let game = new Game();
    let step1 = new GameStep("start", [], [], "you wake up in a cave");
    let step2 = new GameStep("end", [], [], "Game overrrrrrr");
    game.addStep(step1);
    game.addStep(step2);
    game.moveTo("bruh");
}