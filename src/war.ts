import { Game, Player, Deck, Card } from "./classes.js";
import { WarPlayer, WarDeck, WarCard } from "./types.js";

// Event Listener
document.querySelector(".start-game")?.addEventListener("click", () => {
    const playerName: string = getPlayerName();
    // If player hits cancel, exit function
    // The player can hit start again to play
    if (!playerName){
        return;
    }
    startGame(playerName);
    const winnerDisplay = document.querySelector(".game-winner");
    if (winnerDisplay) winnerDisplay.textContent = "";
    const roundResult = document.querySelector(".round-result");
    if (roundResult) roundResult.textContent = "";

    document.querySelector(".start-game")?.classList.toggle("hide");
    document.querySelector(".draw")?.classList.toggle("hide");
});

document.querySelector(".draw")?.addEventListener("click", () => {
    const game: Game = Game.getInstance();
    const winnings = [...game.getWinnings()];
    game.playRound(winnings);
});

// Game
function startGame(playerName: string): void {
    const game: Game = new Game();

    // Function to add cards to main deck
    const mainDeck: WarDeck = new Deck(fillMainDeck());
    const playerDeck: WarDeck = new Deck([]);
    const computerDeck: WarDeck = new Deck([]);
    const player: WarPlayer = new Player(playerName, playerDeck);
    const computer: WarPlayer = new Player("Computer", computerDeck);

    game.setPlayer(player);
    game.setComputer(computer);
    game.setMainDeck(mainDeck);

    const playerHeading = document.querySelector(".player h2");
    if (playerHeading) playerHeading.textContent = player.name;
    const computerHeading = document.querySelector(".computer h2");
    if (computerHeading) computerHeading.textContent = computer.name;

    // Shuffle deck
    mainDeck.shuffle();

    // Deal half the cards to each player
    game.deal();

    // Initialize card total displays
    game.updateCardTotalDisplay();
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
                cardName = "Jack";
                break;
            case 12:
                cardName = "Queen";
                break;
            case 13:
                cardName = "King";
                break;
            case 14:
                cardName = "Ace";
                break;
            default:
                cardName = cardValue.toString();
        }

        const club: WarCard = new Card("clubs", cardValue, cardName);
        const diamond: WarCard = new Card("diamonds", cardValue, cardName);
        const heart: WarCard = new Card("hearts", cardValue, cardName);
        const spade: WarCard = new Card("spades", cardValue, cardName);
        deck.push(club, diamond, heart, spade);

    }

    return deck;
}

// TODO: Create function to add last played round result to the history log