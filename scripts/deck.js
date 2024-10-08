class Deck {
  constructor() {
    this._suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
    this._denominations = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
    this.deck = this._getDeck();
  }

  _getDeck() {
    const deck = [];
    for (let x of this._suits) {
      for (let y of this._denominations) {
        deck.push(`${y} of ${x}`);
      }
    }
    this._shuffleDeck(deck);
    return deck;
  }

  _shuffleDeck(deck) {
    // Fischer-Yates Shuffle
    let currentIndex = deck.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [deck[currentIndex], deck[randomIndex]] = [
        deck[randomIndex],
        deck[currentIndex],
      ];
    }
  }
}

class Player {
  constructor() {
    this.name = "player";
    this.hand = [];
    this.money = 500;
  }

  getHandValue() {
    //i anticipate some corner case issues with the aces
    //need to flush out the algorithm
    let handValue = 0;
    this.hand.forEach((card) => {
      if (card[0] === "A") {
        if (handValue + 11 > 21) {
          handValue += 1;
        } else {
          handValue += 11;
        }
      } else if (
        card[0] === "1" ||
        card[0] === "J" ||
        card[0] === "Q" ||
        card[0] === "K"
      ) {
        handValue += 10;
      } else {
        handValue += Number(card[0]);
      }
    });
    console.log(handValue);
    return handValue;
  }
}

class Dealer {
  constructor(player, deck) {
    this.name = "dealer";
    this.hand = [];
    this.player = player;
    this.deck = deck;
  }

  hit(hand) {
    hand.push(deck.deck.pop(0));
    console.log(hand);
  }

  deal() {
    this.hit(this.player.hand);
    this.hit(this.hand);
    this.hit(this.player.hand);
    this.hit(this.hand);
  }
}

class Hand {
  constructor(playerArray, deck) {
    this.dealer = playerArray.pop();
    this.players = playerArray;
    this.deck = deck;
  }
}

const cardTemplate = document.querySelector("#card__template");
const buttonTemplate = document.querySelector("#button__template");
const buttonContainer = document.querySelector(".player__button_container");

const playerHandElement = document.querySelector(".player__hand");
const dealerHandElement = document.querySelector(".dealer__hand");
const deck = new Deck();
const player = new Player();
const dealer = new Dealer(player, deck);
dealer.deal();

console.log(player.hand);
player.hand.forEach((card) => {
  const templateClone = cardTemplate.content.cloneNode(true);
  templateClone.querySelector(".card__name").textContent = card;
  playerHandElement.append(templateClone);
});

let playerHandValue = player.getHandValue();

if (playerHandValue < 21) {
  const buttonClone = buttonTemplate.content.cloneNode(true);
  const button = buttonClone.querySelector(".player__button");
  button.textContent = "Hit";
  button.addEventListener("click", () => {
    dealer.hit(player.hand);
  });
  buttonContainer.append(button);
}
