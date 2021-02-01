//User Interface Management
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

//User Interface Management Continued
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

//Random Number Guessing
function randomNumber(minimum, maximum) {
  let range = maximum - minimum + 1;
  let randomInteger = Math.round(Math.random() * range);
  return randomInteger;
}

//Set Computer Secret Number
let humanRangeMinimum = 1;
let humanRangeMaximum = 100;
randomInteger = randomNumber(humanRangeMinimum, humanRangeMaximum);
secretNumber = randomInteger;
console.log(humanSecretNumber);

//Human Guess Game Sequence
async function humanGuessGame() {
  //Present Challenge
  let humanGuess = await ask(
    "I am thinking of a secret number between 1 and 100. Try to guess it..."
  );
  
  //Player Wins
  if (humanGuess == humanSecretNumber) {
    console.log("You win!");
    process.exit();
  }
  console.log(humanGuess);

  //Main Game Loop
  while (humanGuess !== secretNumber) {
    
    //Player Guesses High
    if (humanGuess < humanSecretNumber) humanGuess = await ask("Guess higher...");
    
    //Player Guesses Low
    if (humanGuess > humanSecretNumber) humanGuess = await ask("Guess lower...");
    
    //Player Wins
    if (humanGuess == humanSecretNumber) {
      console.log("You win!");
      process.exit();
    }
  }
}

//Calls Game to Start
humanGuessGame();
