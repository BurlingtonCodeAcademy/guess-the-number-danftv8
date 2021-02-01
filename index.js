//User Interface Management
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

//User Interface Management Continued
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

//Random Secret Number
function randomNumber(minimum, maximum) {
  let range = maximum - minimum + 1;
  let randomInteger = Math.round(Math.random() * range);
  return randomInteger;
}

//Smart Number Guessing
function middleValue(minimum, maximum) {
  let middleOfRange = (minimum + maximum) / 2;
  let roundedMiddle = Math.round(middleOfRange);
  return roundedMiddle;
}

//Answer Range Options for Computer Guessing Game
let rangeMinimum = 1;
// let rangeMaximum = 100;

//Set Computer Secret Number for Human Guessing Game
let humanRangeMinimum = 1;
let humanRangeMaximum = 100;
randomInteger = randomNumber(humanRangeMinimum, humanRangeMaximum);
humanSecretNumber = randomInteger;

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
  while (humanGuess !== humanSecretNumber || humanGuess === humanSecretNumber) {
    
    //Player Guesses High
    if (humanGuess < humanSecretNumber) {
      humanGuess = await ask("Guess higher...");
    }
    
    //Player Guesses Low
    if (humanGuess > humanSecretNumber) {
      humanGuess = await ask("Guess lower...");
    }
    
    //Player Wins
    if (humanGuess == humanSecretNumber) {
      console.log("You win!");
      process.exit();
    }
  }
}

//Computer Guess Game Sequence
async function computerGuessGame() {
  
  //Set the Guess Range
  setRangeMaximum = await ask(
    "Let's play a game where you pick a secret number and I guess it.\nThe minimum will be 1 but\nyou're going to pick the highest number of the guessing range.\n"
  );

  //Translates Maximum Range Data Type
  let rangeMaximum = parseInt(setRangeMaximum);
  previousGuess = middleValue(rangeMinimum, rangeMaximum);

  //Smart Smaller Guess
  if (rangeMaximum < 4) {
    previousGuess = 1;
  }

  //Maximum Range Log
  console.log(`The highest possible number is ${rangeMaximum}.\n`);

  //Pick A Number, Any Number
  let secretNumber = await ask(
    "Tell my friend your secret number.\nHe's gonna make sure you don't cheat...\n"
  );

  //Secret Number Log
  console.log(`You tell them the secret number is ${secretNumber}.`);

  //First Confirmation
  let confirmation = await ask(
    `Is your number ${previousGuess} ?, if it is press (y), if not press (n).\n`
  );

  //Main Game Loop
  while (
    confirmation === "h" ||
    confirmation === "l" ||
    confirmation === "y" ||
    confirmation === "n"
  ) {
    //Answer Lie Cheat Detector
    if (previousGuess == secretNumber && confirmation !== "y") {
      console.log(
        "My friend told me you cheated, I don't want to play anymore!"
      );
      process.exit();
    }

    //Computer Victory
    if (confirmation === "y") {
      console.log("I Win!");
      process.exit();
    }

    //The Computer Guessed Wrong
    else if (confirmation === "n") {
      confirmation = await ask(
        "If your number is higher, press (h), if it is lower, press (l)"
      );
    }

    //Modify the Low End
    if (confirmation === "h") {
      rangeMinimum = previousGuess;
    }

    //Range Bust Cheat Detector
    if (
      confirmation === "l" &&
      previousGuess < secretNumber
    ) {
      console.log(
        "My friend told me you cheated, I don't want to play anymore!"
      );
      process.exit();
    }

    //Range Bust Cheat Detector
    if (
      confirmation === "h" &&
      previousGuess > secretNumber
    ) {
      console.log(
        "My friend told me you cheated, I don't want to play anymore!"
      );
      process.exit();
    }
    
    // Modify the High End
    if (confirmation === "l") {
      rangeMaximum = previousGuess;
    }

    //Modified Answer for Large Numbers
    if ((rangeMaximum >= 4 && confirmation === "h") || confirmation === "l") {
      confirmation = await ask(
        `Is your number ${middleValue(
          rangeMinimum,
          rangeMaximum
        )}?, (y) for yes, or is it higher (h) or lower (l)?`
      );
      } else if (
        (rangeMaximum < 4 && confirmation === "h") ||
        confirmation === "l"
      ) {
        previousGuess += 1;
        confirmation = await ask(
          `Is your number ${previousGuess}?, (y) for yes, or is it higher (h)?`
        );
    }

    //Stores New Guess for Large Range Adjustment
    if (rangeMaximum >= 4) {
      previousGuess = middleValue(rangeMinimum, rangeMaximum);
    }
    
    //Stores New Guess for Small Range Adjustment
    else if (rangeMaximum < 4 && secretNumber < 4) {
      previousGuess = randomNumber(rangeMinimum, rangeMaximum);
    }
  }
}

//Game Sequence Bundle
async function gameChoiceLoop() {
  //Pick a Game
  let loopConfirmation = await ask(
    "Hi, I'd like to play a guessing game.\nIf you would like to guess press (m) as in 'me'.\nIf you would like me to guess press (c) for computer.\nYou can also quit by pressing (q)."
  );
  while (
    loopConfirmation === "m" ||
    loopConfirmation === "c" ||
    loopConfirmation === "q"
  ) {
    loopConfirmation = await ask(
      "To confirm press again, though you can change your mind..."
    );

    if (loopConfirmation === "c") {
      computerGuessGame();
    }
    if (loopConfirmation === "m") {
      humanGuessGame();
    }
    //Play Again Request
    // loopConfirmation = await ask(
    //   "Would you like to play again?\nPress any key to continue.\nPress (q) to quit."
    // );
    // if (loopConfirmation !== "c" || loopConfirmation !== "m")
    //   loopConfirmation = await ask(
    //     "If you would like to guess press (m) as in 'me'.\nIf you would like the computer to guess press (c).\nYou can also quit anytime by pressing (q)."
    //   );
    if (loopConfirmation === "q") {
      console.log("Thanks for playing!");
      process.exit();
    }
  }
}

//Start Game Bundle
gameChoiceLoop();
