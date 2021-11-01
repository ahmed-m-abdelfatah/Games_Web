let [computerScore, userScore] = [0, 0];
const resultRef = document.getElementById("result");
const choicesObject = {
  // object 1
  rock: {
    // properties = key:value
    rock: "draw",
    paper: "lose",
    scissors: "win",
  },
  // object 2
  paper: {
    rock: "win",
    paper: "draw",
    scissors: "lose",
  },
  // object 3
  scissors: {
    rock: "lose",
    paper: "win",
    scissors: "draw",
  },
};

function checker(userChoice) {
  const choices = ["rock", "paper", "scissors"];
  const num = Math.floor(Math.random() * choices.length);
  let computerChoice = choices[num];

  // computer choice
  document.getElementById(
    "computer-choice"
  ).innerHTML = `Computer choose <span>${computerChoice.toUpperCase()}</span>`;

  // user choice
  document.getElementById(
    "user-choice"
  ).innerHTML = `You choose <span>${userChoice.toUpperCase()}</span>`;

  // determining the winner
  switch (choicesObject[userChoice][computerChoice]) {
    case "win":
      resultRef.style.cssText = "background-color:#cefdce; color:#689f38";
      resultRef.textContent = "YOU WIN";
      userScore++;
      break;

    case "lose":
      resultRef.style = "background-color:#ffdde0; color:#d32f2f";
      resultRef.textContent = "YOU LOSE";
      computerScore++;
      break;

    default:
      resultRef.style = "background-color:#e5e5e5; color:#808080";
      resultRef.textContent = "DRAW";
      break;
  }

  document.getElementById("computer-score").textContent = computerScore;
  document.getElementById("user-score").textContent = userScore;
}
/* we choose object like array 
choicesObject[userChoice][computerChoice] 
choicesObject[rock][rock]
choicesObject[1][1] => object 1 => property 1
*/

/*
 Notes
 1. Learn JavaScript OOP in Arabic #03 - Defining Object With Object Literals Part 1
 = https://youtu.be/EL7lnUILFgE
 2. Learn JavaScript OOP in Arabic #04 - Defining Object With Object Literals Part 2
 = https://youtu.be/QEezkBKqhfw
*/
