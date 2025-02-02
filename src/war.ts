// Create separate file for types?
// Types
type WarGame = {
    player: WarPlayer;
    computer: WarPlayer;
    mainDeck: WarDeck;
    deal: () => void;
}

type WarPlayer = {
    name: string;
    deck: WarDeck;
}

type WarCard = {
    suit: "clubs" | "diamonds" | "hearts" | "spades";
    value: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
    name: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A";
}

type WarDeck = {
    cards: WarCard[];
    total: number;
    addCards: (...cards) => void;
}

// Create separate file for classes?
// Classes
class Game implements WarGame {
    player: WarPlayer;
    computer: WarPlayer;
    mainDeck: WarDeck;

    constructor(player: WarPlayer, computer: WarPlayer, mainDeck: WarDeck) {
        this.player = player;
        this.computer = computer;
        this.mainDeck = mainDeck;
    }

    deal(): void {
        for (let i = 0; i < this.mainDeck.total; i++) {
            if (i % 2 === 0) {
                this.player.deck.addCards(this.mainDeck.cards[i]);
            } else {
                this.computer.deck.addCards(this.mainDeck.cards[i]);
            }
        }
    }
}

class Player implements WarPlayer {
    name: string;
    deck: WarDeck;

    constructor(name: string, deck: WarDeck) {
        this.name = name;
        this.deck = deck;
    }
}

class Card implements WarCard {
    suit: "clubs" | "diamonds" | "hearts" | "spades";
    value: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
    name: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A";

    constructor(
        suit: "clubs" | "diamonds" | "hearts" | "spades",
        value: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14,
        name: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A"
    ) {
        this.suit = suit;
        this.value = value;
        this.name = name;
    }
}

class Deck implements WarDeck {
    cards: WarCard[];
    total: number;

    constructor(cards: WarCard[]) {
        this.cards = cards;
        this.total = cards.length;
    }

    shuffle(): void {
        let cardTotal = this.cards.length;
        let temp;
        let index;
        while(cardTotal) {
            index = Math.floor(Math.random() * cardTotal--);
            temp = this.cards[cardTotal];
            this.cards[cardTotal] = this.cards[index];
            this.cards[index] = temp;
        }
    }

    // Pull card from top of deck

    // Add won cards to bottom of deck
    addCards(...cards: WarCard[]): void {
        const newTotal = this.cards.push(...cards)
        this.total = newTotal;
    }
}

// Event Listener
document.querySelector(".start-game")?.addEventListener("click", () => {
    startGame();
});

// TODO: create event listener for a draw button that calls a function to play one round of the game

// Game
function startGame(): void {
    // Function to add cards to main deck
    const mainDeck = new Deck(fillMainDeck());
    const playerDeck = new Deck([]);
    const computerDeck = new Deck([]);
    const playerName: string = getPlayerName();
    const player = new Player(playerName, playerDeck);
    const computer = new Player("Computer", computerDeck);

    const game = new Game(player, computer, mainDeck);

    // Shuffle deck
    mainDeck.shuffle();

    // Deal half the cards to each player
    game.deal();

    console.log(player.deck);
    console.log(computer.deck);
    console.log(mainDeck);
}

function getPlayerName(): string {
    let response = prompt("What is your name?", "");
    if (!response) {
        response = "Player";
    }
    return response;
}

function fillMainDeck(): WarCard[] {
    const deck: WarCard[] = [];

    for (let i = 0; i < 13; i++) {
        let cardName;
        const cardValue: WarCard["value"] = i + 2 as WarCard["value"];

        switch(cardValue) {
            case 11:
                cardName = "J";
                break;
            case 12:
                cardName = "Q";
                break;
            case 13:
                cardName = "K";
                break;
            case 14:
                cardName = "A";
                break;
            default:
                cardName = cardValue.toString();
        }

        const club = new Card("clubs", cardValue, cardName);
        const diamond = new Card("diamonds", cardValue, cardName);
        const heart = new Card("hearts", cardValue, cardName);
        const spade = new Card("spades", cardValue, cardName);
        deck.push(club, diamond, heart, spade);

    }

    return deck;
}

// TODO: Create function that plays a single round of the game

// TODO: Create function to update card total display

// TODO: Create function to update played card displays for player and computer

// TODO: Create function to add last played round result to the history log