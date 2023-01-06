// elements
const game = document.body.querySelector('.ttt-game');
const cells = {};
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

// logic
// let paused = true;

/**
 * @Author: Ahmed Abdelfatah
 * @Date: 2023-01-06 15:14:32
 * @Desc: for loop to fill cells object and add click event on each cell
 */
for (let y = 1; y <= 3; y++) {
  for (let x = 1; x <= 3; x++) {
    const el = game.querySelector(`.ttt-row:nth-child(${y}) .ttt-cell:nth-child(${x})`);
    el.dataset.x = x;
    el.dataset.y = y;

    // add event on each cell
    el.addEventListener('click', cellClickEvent);

    // fill the cells object
    cells[y] = cells[y] || {};

    cells[y][x] = {
      x,
      y,
      el,
      value: '',
    };
  }
}

function cellClickEvent(e) {
  // if (paused) {
  //   return;
  // }

  const cell = cells[e.target.dataset.y][e.target.dataset.x];

  if (!cell.value) {
    paused = true;

    fillCell(cell, 'o');

    // const { winner, empty } = check();

    // !winner && play(empty);
  }
}

function fillCell(cell, value) {
  // add value of cell in cells object
  cell.value = value;

  // remove old cell
  // cell.el.firstChild && cell.el.removeChild(cell.el.firstChild);

  // add new cell to ui
  cell.el.appendChild(icons[value].cloneNode(true));
}
