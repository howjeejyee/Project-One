//setting up the deck for new deck and shuffling
const suits = ['spade', 'heart', 'club', 'diamond'];
const numbers = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
//giving values into the respective numbers
const values = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1,11]
}
//setting up some array and values for starting the game
let deck = [];
let playerHand = [];
let dealerHand = [];
let playerPoint = 0;
let dealerPoint = 0;
let playerBalance = 1000;
let playerBet = 0;
let gameOver = false;

const dealButton = document.getElementById('deal-button');
const hitButton = document.getElementById('hit-button');
const standButton = document.getElementById('stand-button');
const doubleButton = document.getElementById('double-button');
const nextButton = document.getElementById('next-button');
const resetButton = document.getElementById('reset-button');
const dealerHandView = document.getElementById('dealer-hand');
const playerHandView = document.getElementById('player-hand');
const dealerTotalPoint = document.getElementById('dealer-total');
const playerTotalPoint = document.getElementById('player-total');
const playerBalanceView = document.getElementById('balance-value')
const betInputValue = document.getElementById('bet-input');
const resultMessage = document.getElementById('message-result');

hitButton.style.display = "none";
standButton.style.display = "none";
doubleButton.style.display = "none";
nextButton.style.display = "none";
resetButton.style.display = "none";

dealButton.addEventListener('click', deal);
hitButton.addEventListener('click', hit);
standButton.addEventListener('click', stand);
doubleButton.addEventListener('click', double);
nextButton.addEventListener('click', next);
resetButton.addEventListener('click', reset);
playerBalance.textContent = "$" + playerBalance;

function createDeck(){
  for (let i=0; i<4; i++) {
    for (let number of numbers) {
      deck.push(number);
    }
  }
}

function shuffleDeck(){
  for (let i=deck.length-1; i>0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function deal() {
  const betValue = parseInt(betInputValue.value);

  if (betValue <= 0) {
    alert('Please place your bet!');
    return;
  }

  if (betValue > playerBalance) {
    alert('Not enough balance! Please place a lower bet.');
    return;
  }

  playerBet = betValue;
  playerBalance = playerBalance - playerBet;
  playerBalanceView.textContent = "$" + playerBalance;

  createDeck();
  shuffleDeck();

  playerHand = [deck.pop(), deck.pop()];
  dealerHand = [deck.pop(), deck.pop()];
  playerPoint = calculatePoint(playerHand);
  dealerPoint = calculatePoint(dealerHand);

  displayHands();
  showButtonsDeal();
}

function calculatePoint(onhand){
  let point = 0;
  let ace = 0;

  for (let card of onhand){
    if (card === 'A'){
      ace++;
    } else {
      point += values[card];
    }
  }
  
  while (ace > 0){
    if (point + 11 <= 21) {
      point += 11;
    } else {
      point += 1;
    }
    ace--;
  }
  return point;
}

function hit(){
  if (gameOver) {
    showButtonsSD();
    return;
  }

  playerHand.push(deck.pop());
  playerPoint = calculatePoint(playerHand);
  displayHands();

  if (playerPoint > 21) {
    endGame('Busted! Dealer wins! Better luck next time!');
    showButtonsSD();
  }
}

function stand(){
  if (gameOver) {
    showButtonsSD();
    return;
  }

  while (dealerPoint < 17) {
      dealerHand.push(deck.pop());
      dealerPoint = calculatePoint(dealerHand);
      displayHands();
  }

  if (dealerPoint > 21 || playerPoint > dealerPoint) {
      endGame('You win! Hooray!');
    showButtonsSD();
  } else if (dealerPoint > playerPoint) {
      endGame('Dealer wins! Better luck next time!');
    showButtonsSD();
  } else {
      endGame('It\'s a tie!');
    showButtonsSD();
  }
}

function double(){
  if (gameOver) {
    showButtonsSD();
    return;
  }

  playerBalance = playerBalance - playerBet;
  playerBalance.textContent = playerBalance;
  updateBalance();
  playerBet = playerBet * 2;
  playerHand.push(deck.pop());
  playerPoint = calculatePoint(playerHand);
  displayHands();

  if (playerPoint > 21) {
    endGame('Busted! Dealer wins! Better luck next time!');
    showButtonsSD();
    return;
  }

  while (dealerPoint < 17) {
    dealerHand.push(deck.pop());
    dealerPoint = calculatePoint(dealerHand);
    displayHands();
  }

  if (dealerPoint > 21) {
    endGame('You win! Hooray!');
  } else if (playerPoint > dealerPoint) {
    endGame('You win! Hooray!');
  } else if (dealerPoint > playerPoint) {
    endGame('Dealer wins! Better luck next time!');
  } else {
    endGame('It\'s a tie!');
  }

  showButtonsSD();
}

function displayHands(){
  playerHandView.textContent = playerHand.join(', ');
  dealerHandView.textContent = dealerHand.join(', ');
  playerTotalPoint.textContent = 'Player Score: ' + playerPoint;
  dealerTotalPoint.textContent = 'Dealer Score: ' + dealerPoint;
}

function updateBalance(){
  playerBalanceView.textContent = "$" + playerBalance;
}

function next(){
  playerHand = [];
  dealerHand = [];
  playerPoint = 0;
  dealerPoint = 0;
  playerBet = 0;
  gameOver = false;
  resultMessage.textContent = "";

  playerHandView.textContent = "";
  dealerHandView.textContent = "";
  playerTotalPoint.textContent = "";
  dealerTotalPoint.textContent = "";

  dealButton.style.display = "inline-block";
  hitButton.style.display = "none";
  standButton.style.display = "none";
  doubleButton.style.display = "none";
  nextButton.style.display = "none";
  resetButton.style.display = "none";

  betInputValue.disabled = false;
}

function reset(){
    playerBalance = 1000;
    playerHand = [];
    dealerHand = [];
    playerPoint = 0;
    dealerPoint = 0;
    playerBet = 0;
    gameOver = false;
    resultMessage.textContent = "";
  
    playerHandView.textContent = "";
    dealerHandView.textContent = "";
    playerTotalPoint.textContent = "";
    dealerTotalPoint.textContent = "";

    dealButton.style.display = "inline-block";
    hitButton.style.display = "none";
    standButton.style.display = "none";
    doubleButton.style.display = "none";
    nextButton.style.display = "none";
    resetButton.style.display = "none";

    betInputValue.disabled = false;
    playerBalance.textContent = playerBalance;

    updateBalance();
}

function showButtonsDeal(){
    hitButton.style.display = "inline-block";
    standButton.style.display = "inline-block";
    doubleButton.style.display = "inline-block";
}

function showButtonsSD(){
  nextButton.style.display = "inline-block";
  resetButton.style.display = "inline-block";
}

function endGame(message){
  if (playerBet > 0) {
      if (message.includes('You win! Hooray!')) {
          playerBalance += playerBet * 2;
      } else if (message.includes('Dealer wins! Better luck next time!')) {
        
      } else {
        playerBalance += playerBet;
      }
      betInputValue.disabled = false;
      playerBalance.textContent = playerBalance;
      updateBalance();
  }
  gameOver = true;
  resultMessage.textContent = message;
}
