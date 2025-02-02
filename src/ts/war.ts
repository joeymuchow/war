import { Game, Player, Deck, Card } from "./classes.js";
import { WarCard } from "./types.js";

// Event Listener
document.querySelector(".start-game")?.addEventListener("click", () => {
    const playerName: string = getPlayerName();
    // If player hits cancel, exit function
    // The player can hit start again to play
    if (!playerName){
        return;
    }
    startGame(playerName);
    const startBtn = document.querySelector(".start-game");
    if (startBtn) startBtn.classList.toggle("hide");
});

// TODO: create event listener for a draw button that calls a function to play one round of the game
document.querySelector(".draw")?.addEventListener("click", () => {
    // Call function that draws cards from both players
});

// Game
function startGame(playerName: string): void {
    // Function to add cards to main deck
    const mainDeck = new Deck(fillMainDeck());
    const playerDeck = new Deck([]);
    const computerDeck = new Deck([]);
    const player: Player = new Player(playerName, playerDeck);
    const computer: Player = new Player("Computer", computerDeck);

    const playerHeading = document.querySelector(".player h2");
    if (playerHeading) playerHeading.textContent = player.name;
    const computerHeading = document.querySelector(".computer h2");
    if (computerHeading) computerHeading.textContent = computer.name;

    const game: Game = new Game(player, computer, mainDeck);

    // Shuffle deck
    mainDeck.shuffle();

    // Deal half the cards to each player
    game.deal();

    console.log(player.deck);
    console.log(computer.deck);
    console.log(mainDeck);
}

function getPlayerName(): string {
    return prompt("What is your name?", "") || "";
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