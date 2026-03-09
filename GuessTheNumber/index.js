const userInput = document.querySelector('#guessField');
const submit = document.querySelector('#subt');
let randomNumber = parseInt(Math.random() * 100 + 1);
console.log(randomNumber);
let previouGuesses = [];
let attempts = 10;
let playGame = true;
const p = document.createElement('p');

submit.addEventListener('click', function (e) {
  e.preventDefault();
  const number = parseInt(userInput.value);
  validateGuess(number);
});

function validateGuess(number) {
    if (number < 0 || isNaN(number)){
    document.querySelector('.lowOrHi').innerHTML = `Please Enter a Valid Number`;   
    }else if (number === randomNumber) {
    document.querySelector('.lowOrHi').innerHTML = `Your guess is right ${number}`;
    resetGame();
  } else if (number < randomNumber) {
    previouGuesses.push(number);
    document.querySelector('.lowOrHi').innerHTML = `Your guess is lower`;
    document.querySelector('.guesses').innerHTML = `${previouGuesses}`;
    validateGame();
  } else if (number > randomNumber) {
    previouGuesses.push(number);
    document.querySelector('.lowOrHi').innerHTML = `Your guess is higher`;
    document.querySelector('.guesses').innerHTML = `${previouGuesses}`;
    validateGame();
  }
}

function validateGame() {
  if (attempts === 0) {
    document.querySelector('.lowOrHi').innerHTML = 'Please Start over';
    resetGame();
  } else {
    attempts -= 1;
    document.querySelector('.lastResult').innerHTML = `${attempts}`;
  }
}

function newGame() {
  attempts = 9;
  previouGuesses = [];
  randomNumber = parseInt(Math.random() * 100 + 1);
  userInput.value = '';
  userInput.removeAttribute('disabled');
  submit.removeAttribute('disabled');
  console.log(randomNumber);
  document.querySelector('.lowOrHi').innerHTML = ``;
  document.querySelector('.guesses').innerHTML = `${previouGuesses}`;
  document.querySelector('.lastResult').innerHTML = `${attempts}`;
}

function resetGame() {
  userInput.setAttribute('disabled', '');
  submit.setAttribute('disabled', '');
  p.innerHTML = `<h2 type="button" id="newGame">Start new Game</h2>`;
  document.querySelector('.lowOrHi').appendChild(p);
  document.querySelector('#newGame').addEventListener('click', () => {
    newGame();
  });
}
