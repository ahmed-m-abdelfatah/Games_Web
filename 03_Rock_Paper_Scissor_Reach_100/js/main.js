let [computerScore, userScore] = [0, 0];
const resultRef = document.getElementById('result');
const choicesObject = {
  rock: {
    rock: 'draw',
    paper: 'lose',
    scissors: 'win',
  },
  paper: {
    rock: 'win',
    paper: 'draw',
    scissors: 'lose',
  },
  scissors: {
    rock: 'lose',
    paper: 'win',
    scissors: 'draw',
  },
};

function checker(userChoice) {
  const computerChoices = ['rock', 'paper', 'scissors'];
  const num = Math.floor(Math.random() * computerChoices.length);
  let computerChoice = computerChoices[num];

  document.getElementById('computer-choice').innerHTML = `Computer choose <span>${computerChoice.toUpperCase()}</span>`;

  document.getElementById('user-choice').innerHTML = `You choose <span>${userChoice.toUpperCase()}</span>`;

  // determining the winner
  switch (choicesObject[userChoice][computerChoice]) {
    case 'win':
      resultRef.style.cssText = 'background-color:#cefdce; color:#689f38';
      resultRef.textContent = 'YOU WIN';
      userScore++;
      break;

    case 'lose':
      resultRef.style = 'background-color:#ffdde0; color:#d32f2f';
      resultRef.textContent = 'YOU LOSE';
      computerScore++;
      break;

    default:
      resultRef.style = 'background-color:#e5e5e5; color:#808080';
      resultRef.textContent = 'DRAW';
      break;
  }

  document.getElementById('computer-score').textContent = computerScore;
  document.getElementById('user-score').textContent = userScore;
}
