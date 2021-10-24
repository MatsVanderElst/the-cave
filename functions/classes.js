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