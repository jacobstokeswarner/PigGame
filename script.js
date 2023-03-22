"use strict";

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1"); // slightly faster than query selector

const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// global variables

let scores, currentScore, activePlayer, playing;

// functions:

// initializing the game

const init = function () {
  // setting the score to zero so we can change it as the game progresses
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;

  // add hidden class to dice at beginning of game
  diceEl.classList.add("hidden");

  // making player 1 active
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");

  // removing the winning class from the winner
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
};

// actually initializing the game

init();

// switching players:

const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  // changing background of inactive player
  // switching active player:
  activePlayer = activePlayer === 0 ? 1 : 0;
  // showing which player is active using background colors
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// rolling dice
const rollDice = () => {
  if (playing) {
    // generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // displaying dice roll:
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // checking to see if the dice rolled a 1.
    // If so, score reset to 0, and player is switched
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
};

// holding dice

const holdScore = () => {
  if (playing) {
    // add current score to score of active player
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // if score is  100 or higher, active player wins

    if (scores[activePlayer] >= 100) {
      // finish the game:
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
    } else {
      // else, switch players
      switchPlayer();
    }
  }
};

// EVENT HANDLERS:

// rolling the dice
btnRoll.addEventListener("click", rollDice);

// Hold the dice
btnHold.addEventListener("click", holdScore);

// New Game
btnNew.addEventListener("click", init);
