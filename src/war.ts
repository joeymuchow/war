// Types
type WarPlayer = {
    name: string;
    deck: Card[];
}

type Card = {
    suit: "clubs" | "diamonds" | "hearts" | "spades";
    value: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
    name: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A";
}

// Classes
class Player implements WarPlayer {
    name: string;
    deck: Card[];

    constructor(name: string, deck: Card[]) {
        this.name = name;
        this.deck = deck;
    }

    // Pull card from top of deck

    // Add won cards to bottom of deck
}

// Event Listener
document.querySelector(".start-game")?.addEventListener("click", () => {
    startGame();
});

// Game
function startGame() {
    const playerName: string = getPlayerName();
    const player = new Player(playerName, []);

    console.log(player.name);
}

function getPlayerName() {
    let response = prompt("What is your name?", "");
    if (!response) {
        response = "Player";
    }
    return response;
}