/**
 * @Author: Ahmed Abdelfatah
 * @Date: 2023-01-06 17:25:53
 * @Desc: elements
 */
const game = document.body.querySelector('.ttt-game');
const grid = {};
const icons = {
  x: game.querySelector('#icon-x'),
  o: game.querySelector('#icon-o'),
};
const scores = {
  x: {
    aheadIcon: game.querySelector('#player-icon--ahead'),
    behindIcon: game.querySelector('#player-icon--behind'),
    el: game.querySelector('#score-x'),
    score: 0,
  },
  o: {
    el: game.querySelector('#score-o'),
    score: 0,
  },
};

/**
 * @Author: Ahmed Abdelfatah
 * @Date: 2023-01-06 17:25:48
 * @Desc: logic
 */
let paused = false;
const players = ['x', 'o'];

// for loop to fill grid object and add click event on each cell
for (let y = 1; y <= 3; y++) {
  for (let x = 1; x <= 3; x++) {
    const el = game.querySelector(`.ttt-row:nth-child(${y}) .ttt-cell:nth-child(${x})`);
    el.dataset.x = x;
    el.dataset.y = y;

    // add event on each cell
    el.addEventListener('click', cellClickEvent);

    // fill the grid object
    grid[y] = grid[y] || {};

    grid[y][x] = {
      x,
      y,
      el,
      value: '',
    };
  }
}

// This function is called when a cell in the grid is clicked
function cellClickEvent(e) {
  // If the game is paused, do nothing
  if (paused) {
    return;
  }

  // Get the cell that was clicked
  const cell = grid[e.target.dataset.y][e.target.dataset.x];

  // If the cell is empty
  if (!cell.value) {
    // Pause the game
    paused = true;

    // Fill the cell with an 'o'
    fillCell(cell, 'o');

    // Check if the game has a winner or if there are empty cells left
    const { winner, empty } = check();

    // If there is no winner and there are empty cells left
    if (!winner) {
      // Let the computer play its turn
      play(empty);
    }
  }
}

// fillCell is a function that updates the value of a given cell in a grid object and adds the corresponding element to the UI
function fillCell(cell, value) {
  // update the value of the cell in the grid object
  cell.value = value;

  // create a new element for the cell using the value
  const cellElement = icons[value].cloneNode(true);

  // add the new element to the UI
  cell.el.appendChild(cellElement);
}

function check(dryRun) {
  const empty = [];
  const complete = {
    player: null,
    cells: [],
  };

  for (const axis of ['y', 'x']) {
    const diagonal = { o: [], x: [] };

    for (let a = 1; a <= 3; a++) {
      const y = a;
      const x = axis === 'y' ? y : 4 - y;

      const cell = grid[y][x];

      cell.value && diagonal[cell.value].push(cell);

      const straight = { o: [], x: [] };

      for (let b = 1; b <= 3; b++) {
        const y = axis === 'y' ? a : b;
        const x = axis === 'y' ? b : a;

        const cell = grid[y][x];

        cell.value ? straight[cell.value].push(cell) : empty.push(cell);
      }

      checkLine(straight, complete);
    }

    checkLine(diagonal, complete);
  }

  if (!dryRun) {
    paused = true;

    if (complete.player) {
      scores[complete.player].score++;
      complete.cells.forEach(({ el }) => el.classList.add('ttt-blink'));

      setTimeout(() => {
        complete.cells.forEach(({ el }) => el.classList.remove('ttt-blink'));
        reset();
      }, 1200);
    } else if (!empty.length) {
      setTimeout(() => {
        reset();
      }, 1200);
    }
  }

  return { winner: complete.player, empty: [...new Set(empty)] };
}

/**
 * This function checks if a given line (row, column, or diagonal) has a winning combination
 * for any of the players.
 *
 * @param {Array} line - An array of cells representing a row, column, or diagonal.
 * @param {Object} complete - An object that will be updated with the winning player and cells, if any.
 *
 * @returns {void}
 */
function checkLine(line, complete) {
  // Loop through each player
  for (const player of players) {
    // Check if the player has a winning combination in the current line
    if (line[player].length === 3) {
      // If so, update the "complete" object with the player and winning cells
      complete.player = player;
      complete.cells.push(...line[player]);
    }
  }
}

function play(cells) {
  setTimeout(() => {
    let found = false;

    search: for (const player of players) {
      for (const cell of cells) {
        cell.value = player;

        const { winner, empty } = check(true);

        if (winner || !empty) {
          found = true;

          fillCell(cell, 'x');

          break search;
        } else {
          cell.value = '';
        }
      }
    }

    if (!found) {
      const cell = cells[Math.round(Math.random() * (cells.length - 1))];

      fillCell(cell, 'x');
    }

    const { winner, empty } = check();

    if (!winner && empty) {
      paused = false;
    }
  }, 400);
}

function reset() {
  scores.x.el.textContent = scores.x.score.toString();
  scores.o.el.textContent = scores.o.score.toString();

  scores.x.aheadIcon.classList[scores.x.score < scores.o.score ? 'add' : 'remove']('icon-hidden');
  scores.x.behindIcon.classList[scores.x.score >= scores.o.score ? 'add' : 'remove']('icon-hidden');

  for (let y = 1; y <= 3; y++) {
    for (let x = 1; x <= 3; x++) {
      const cell = grid[y][x];

      cell.el.firstChild && cell.el.removeChild(cell.el.firstChild);

      cell.value = '';
    }
  }

  const { empty } = check();

  play(empty);
}

reset();
