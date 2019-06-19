/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

const RESET_VALUE = 1;

let scores = [0, 0];
let activePlayer = 0;
let current = 0;
const diceElement = document.querySelector('.dice');
const dice2Element = document.querySelector('.dice2');

const initGame = () => {
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;
  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;
  diceElement.style.display = 'none';
  dice2Element.style.display = 'none';
};

initGame();

const getRandomDice = () => {
  return Math.floor(Math.random() * 6) + 1;
};

const changeDice = (element, dice) => {
  element.src = `dice-${dice}.png`;
  element.style.display = 'block';
};

const hideDice = () => {
  diceElement.style.display = 'none';
  dice2Element.style.display = 'none';
};

document.querySelector('.btn-roll').addEventListener('click', function() {
  let dice = getRandomDice();
  let dice2 = getRandomDice();

  changeDice(diceElement, dice);
  changeDice(dice2Element, dice2);

  if (dice !== RESET_VALUE) {
    current += dice;
    document.getElementById('current-'+activePlayer).textContent = current;

    if (scores[activePlayer] + current >= 20) {
      alert(`Player ${activePlayer} won!!!`);
    }

  } else {
    changePlayer();
  }
});

const changePlayer = () => {
  current = 0;
  document.getElementById('current-'+activePlayer).textContent = 0;
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
  activePlayer = +!activePlayer;
  hideDice();
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
};

document.querySelector('.btn-hold').addEventListener('click', function() {
  scores[activePlayer] += current;
  document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
  changePlayer();
});

document.querySelector('.btn-new').addEventListener('click', function() {
  initGame();
});
