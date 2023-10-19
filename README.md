# Project 1: Blackjack Game

# Project Description
**Blackjack** is a popular card game that played in casinos. As the rules are simple and easily to learn, it will make your heartbeat go fast when you are trying to hit a card that you wanted to beat the **Dealer** or **Player** will try not to get busted by going over 21 point, which is why some places **Blackjack** is call **21** too! In this project I have make a simple Blackjack game that let **Player** able to heads up against **Dealer** on a one on one situation. For **Player** that is new to this game you may read the **Guidelines** in the next section.

# Guidelines
In this project, player will start with a balance of *$1000*. Player then will need to place their bet by key in the amount that is within *$1000* before starting the game. After the bet have been placed, Player should click on the **Deal Button** to initiate and start the game. Player and Dealer will then be dealt 2 cards and **Hit Button**, **Stand Button** and **Double Button** will appear after the game start. The way to win this game is try to keep your total point of your card below 21 and if your total point is over 21, you are busted and will lose the game. After both player have enough total points, they will have to compete with each other and the person with the higher point that is not over 21 will be the winner. After the winner have been confirmed, **Next Game Button** and **Reset Button** will be shown and Player would have to make a decision here. There are various of buttons with different functions that will be explained below on how to use these buttons.

* **Deal Button**: After Player done place his bet, Player will have to click this button to trigger the deck to be shuffle and deal.
* **Hit Button**: When Player click this button, he will draw one card from the deck. It can be use multiple times.
* **Stand Button**: When Player feel their total point is enough, Player can click this button to trigger into showdown with the Dealer.
* **Double Button**: Player will double their bet when this button is clicked, but Player can only draw once from the deck.
* **Next Game Button**: This button will trigger and let Player to make a new bet on a new game.
* **Reset Button**: This button will reset the whole game into the starting state.

# Example Codes
There are a lot of codes used inside this project, I will list out some examples in the below.

**Deal Button** function: 
At start, this function will check if the Player have make his bet. If the Player bet is done, **Deal Button** will proceed to check if the Player bet is True or False before proceeding to create a new deck and shuffle the deck before dealing it out. 
```javascript
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
```

# Future Plans
As the gameplay of Blackjack is display, there are still some area I wish to strengthen it. The list below is my plan on working on it:

1. Implement the card library so when the card is dealt, it will not only show the value of the card, it will also have image on it.
2. Restricting the betting part by implementing *Chips System*, where Player can only bet using the chip.
3. Making the game into multiplayer.
4. Adding sound effect when Player win or lose.

This are my current planning to update this project in the future. Hope you all enjoy the game and have fun!



