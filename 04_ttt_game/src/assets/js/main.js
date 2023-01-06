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

function cellClickEvent(e) {
  const cell = grid[e.target.dataset.y][e.target.dataset.x];

  if (!cell.value) {
    fillCell(cell, 'o');

    const { winner, empty } = check();
    console.log('winner', winner);

    // !winner && play(empty);
  }
}

function fillCell(cell, value) {
  // add value of cell in grid object
  cell.value = value;

  // add new cell to ui
  cell.el.appendChild(icons[value].cloneNode(true));
}

function check(dryRun) {
  const empty = [];
  const complete = {
    player: null,
    cells: [],
  };

  // check win
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
    if (complete.player) {
      scores[complete.player].score++;

      console.log('reset');
      //   reset();
    } else if (!empty.length) {
      console.log('reset');
      //   reset();
    }
  }

  return { winner: complete.player, empty: [...new Set(empty)] };
}

function checkLine(line, complete) {
  for (const player of players) {
    if (line[player].length === 3) {
      complete.player = player;
      complete.cells.push(...line[player]);
      console.log('complete', complete);
    }
  }
}
