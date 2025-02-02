import { WarCard } from "./types";
import { Game, Player, Deck, Card } from "./classes";


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