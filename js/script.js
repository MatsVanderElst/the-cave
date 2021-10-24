
const animationOne = () => {
  var tl = gsap.timeline({repeat: 2, repeatDelay: 1});
  tl.to("img1", {x: 100, duration: 1});
  tl.to("img2", {y: 50, duration: 1});
  tl.to("img3", {opacity: 0, duration: 1});
}

const gameConfig = [
    {
      choice: "Start",
      prompt: "A dragon is in front of you!",
      options: ["Run", "Fight"],
      animation: animationOne
    },
    {
      choice: "Run",
      prompt: "There's a wall in front of you.",
      options: ["Climb", "Go around"]
    },
    {
      choice: "Fight",
      prompt: "The dragon breathes fire!",
      options: ["Duck", "Jump"]
    }
  ];
  
  
  const gameStep = new GameStep("start","A firebreathing dragon apears before you and it seems he's hasnt eaten in decade...");
  gameStep.addChoice("fight","battle"); 
  gameStep.addChoice("hide","death"); 


  const prompt = document.querySelector(".prompt");
  const chooser = document.querySelector(".chooser");
  const actBtn = document.querySelector(".act-btn");
  
  function act(choice) {
    prompt.textContent = gameConfig.filter(
      config => config.choice === choice
    )[0].prompt;
    chooser.innerHTML = gameConfig
      .filter(config => config.choice === choice)[0]
      .options.map(option => `<option value="${option}">${option}</option>`)
      .join("");
  }
  
  actBtn.addEventListener("click", () => act(chooser.value));
  
  act("Start");
  