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
    this.hand = [];
    this.money = 500;
  }
}

class Dealer {
  constructor(player, deck) {
    this.hand = [];
    this.player = player;
    this.deck = deck;
  }

  hit(hand) {
    hand.push(deck.deck.pop(0));
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

const deck = new Deck();
const player = new Player();
const dealer = new Dealer(player, deck);
dealer.deal();

console.log(player.hand);
