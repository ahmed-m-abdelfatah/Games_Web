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

let [computerScore, userScore] = [0, 0];
const resultText = document.getElementById('result');
const weaponsButtons = document.querySelectorAll('.weapons > button');

weaponsButtons.forEach((button, index, nodeList) => {
  button.addEventListener('click', function () {
    let userChoice = this.dataset.choice;
    nodeList.forEach(element => {
      if (element.dataset.choice != userChoice) {
        element.disabled = true;
      }
    });

    let interval = setInterval(function () {
      console.log('object');
      checker(userChoice);

      if (computerScore == 100 || userScore == 100) {
        clearInterval(interval);
      }
    }, 10);
  });
});

function checker(userChoice) {
  const computerChoices = ['rock', 'paper', 'scissors'];
  const num = Math.floor(Math.random() * computerChoices.length);
  let computerChoice = computerChoices[num];

  document.getElementById('computer-choice').innerHTML = `Computer choose <span>${computerChoice.toUpperCase()}</span>`;

  document.getElementById('user-choice').innerHTML = `You choose <span>${userChoice.toUpperCase()}</span>`;

  // determining the winner
  switch (choicesObject[userChoice][computerChoice]) {
    case 'win':
      resultText.style.cssText = 'background-color:#cefdce; color:#689f38';
      resultText.textContent = 'YOU WIN';
      userScore++;
      break;

    case 'lose':
      resultText.style = 'background-color:#ffdde0; color:#d32f2f';
      resultText.textContent = 'YOU LOSE';
      computerScore++;
      break;

    default:
      resultText.style = 'background-color:#e5e5e5; color:#808080';
      resultText.textContent = 'DRAW';
      break;
  }

  document.getElementById('computer-score').textContent = computerScore;
  document.getElementById('user-score').textContent = userScore;
}
