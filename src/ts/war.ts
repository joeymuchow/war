import { Game, Player, Deck, Card } from "./classes.js";
// import Game from "./classes.js";
import { WarGame, WarPlayer, WarDeck, WarCard } from "./types.js";

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
    const drawBtn = document.querySelector(".draw");
    if (drawBtn) drawBtn.classList.toggle("hide");
});

document.querySelector(".draw")?.addEventListener("click", () => {
    playRound([]);
});

// Game
function startGame(playerName: string): void {
    // Function to add cards to main deck
    const mainDeck: WarDeck = new Deck(fillMainDeck());
    const playerDeck: WarDeck = new Deck([]);
    const computerDeck: WarDeck = new Deck([]);
    const player: WarPlayer = new Player(playerName, playerDeck);
    const computer: WarPlayer = new Player("Computer", computerDeck);

    const playerHeading = document.querySelector(".player h2");
    if (playerHeading) playerHeading.textContent = player.name;
    const computerHeading = document.querySelector(".computer h2");
    if (computerHeading) computerHeading.textContent = computer.name;

    const game: WarGame = new Game(player, computer, mainDeck);

    // Shuffle deck
    mainDeck.shuffle();

    // Deal half the cards to each player
    game.deal();

    // Initialize card total displays
    updateCardTotalDisplay();

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

        const club: WarCard = new Card("clubs", cardValue, cardName);
        const diamond: WarCard = new Card("diamonds", cardValue, cardName);
        const heart: WarCard = new Card("hearts", cardValue, cardName);
        const spade: WarCard = new Card("spades", cardValue, cardName);
        deck.push(club, diamond, heart, spade);

    }

    return deck;
}

function playRound(warWinnings: WarCard[]): void {
    // Grab instance of game so we can access player decks
    const game: WarGame = Game.getInstance();
    
    const playerCard: WarCard = game.player.deck.drawCard();
    const computerCard: WarCard = game.computer.deck.drawCard();
    console.log(playerCard);
    console.log(computerCard);
    // let winner: string;

    if (playerCard.value > computerCard.value) {
        // Player wins
        // winner = game.player.name;
        game.player.deck.addCards(playerCard, computerCard, ...warWinnings);
    } else if (playerCard.value < computerCard.value) {
        // Computer wins
        // winner = game.computer.name;
        game.computer.deck.addCards(computerCard, playerCard, ...warWinnings);
    } else {
        // War
        const winnings = [
            playerCard,
            game.player.deck.drawCard(),
            game.player.deck.drawCard(),
            game.player.deck.drawCard(),
            computerCard,
            game.computer.deck.drawCard(),
            game.computer.deck.drawCard(),
            game.computer.deck.drawCard(),
        ];
        // TODO: should I shuffle these cards before they return to the winner's deck?
        console.log("cards to be won");
        console.log(winnings);
        playRound(winnings);
    }

    updateCardTotalDisplay();
}

function updateCardTotalDisplay(): void {
    const game: WarGame = Game.getInstance();
    const playerTotal = document.querySelector(".player .total");
    const computerTotal = document.querySelector(".computer .total");

    if (playerTotal) playerTotal.textContent = game.player.deck.total.toString();
    if (computerTotal) computerTotal.textContent = game.computer.deck.total.toString();
}

// TODO: Create function to update played card displays for player and computer

// TODO: Create function to add last played round result to the history log