import { WarPlayer, WarDeck, WarCard, WarWinner } from "./types.js";

// Classes
export class Game {
    static _instance: Game;
    private _player: WarPlayer;
    private _computer: WarPlayer;
    private _mainDeck: WarDeck;
    private _winnings: WarCard[] = [];

    constructor() {
        if (Game._instance) {
            return Game._instance;
        }
        Game._instance = this;
    }

    static getInstance(): Game {
        return Game._instance;
    }

    getPlayer(): WarPlayer {
        return this._player;
    }

    setPlayer(player: WarPlayer) {
        this._player = player;
    }

    getComputer(): WarPlayer {
        return this._computer;
    }

    setComputer(computer: WarPlayer) {
        this._computer = computer;
    }

    getMainDeck(): WarDeck {
        return this._mainDeck;
    }

    setMainDeck(deck: WarDeck) {
        this._mainDeck = deck;
    }

    getWinnings(): WarCard[] {
        return this._winnings;
    }

    setWinnings(winnings: WarCard[]) {
        this._winnings = winnings;
    }

    deal(): void {
        for (let i = 0; i < this._mainDeck.total; i++) {
            if (i % 2 === 0) {
                this._player.deck.addCards(this._mainDeck.cards[i]);
            } else {
                this._computer.deck.addCards(this._mainDeck.cards[i]);
            }
        }
    }

    playRound(warWinnings: WarCard[]): void {      
        const playerCard: WarCard = this._player.deck.drawCard();
        const computerCard: WarCard = this._computer.deck.drawCard();
        let roundResult: string;
        let gameWinner: WarWinner = { isWinner: false, name: ""};
    
        if (playerCard.value > computerCard.value) {
            // Player wins
            roundResult = `${this.getPlayer().name} wins the round!`;
            this._player.deck.addCards(playerCard, computerCard, ...warWinnings);
            // Clear winnings when someone wins a hand
            this.setWinnings([]);
            gameWinner = this.checkForWinner(false);
        } else if (playerCard.value < computerCard.value) {
            // Computer wins
            roundResult = `${this.getComputer().name} wins the round!`;
            this._computer.deck.addCards(computerCard, playerCard, ...warWinnings);
            // Clear winnings when someone wins a hand
            this.setWinnings([]);
            gameWinner = this.checkForWinner(false);
        } else {
            // War
            gameWinner = this.checkForWinner(true);
            if (!gameWinner.isWinner) {
                roundResult = "War!";
                const newWinnings = [
                    playerCard,
                    this._player.deck.drawCard(),
                    this._player.deck.drawCard(),
                    this._player.deck.drawCard(),
                    computerCard,
                    this._computer.deck.drawCard(),
                    this._computer.deck.drawCard(),
                    this._computer.deck.drawCard(),
                ];
                // Add new war winnings to previous ones in the case of multiple wars in a row
                this.setWinnings([...warWinnings, ...newWinnings]);
            } else {
                roundResult = "";
            }
        }
    
        this.updatePlayedCardDisplay(playerCard, computerCard);
        this.updateCardTotalDisplay();
        this.updateRoundResultDisplay(roundResult);
        this.updateGameWinnerDisplay(gameWinner);
    }

    updatePlayedCardDisplay(playerCard: WarCard, computerCard: WarCard): void {
        const playerCardDisplay = document.querySelector(".player .card");
        const computerCardDisplay = document.querySelector(".computer .card");
    
        if (playerCardDisplay) playerCardDisplay.textContent = `${playerCard.name} of ${playerCard.suit[0].toUpperCase() + playerCard.suit.slice(1)}`;
        if (computerCardDisplay) computerCardDisplay.textContent = `${computerCard.name} of ${computerCard.suit[0].toUpperCase() + computerCard.suit.slice(1)}`;
    }

    updateCardTotalDisplay(): void {
        const game: Game = Game.getInstance();
        const playerTotal = document.querySelector(".player .total");
        const computerTotal = document.querySelector(".computer .total");
    
        if (playerTotal) playerTotal.textContent = game._player.deck.total.toString();
        if (computerTotal) computerTotal.textContent = game._computer.deck.total.toString();
    }

    updateRoundResultDisplay(roundResultMessage: string): void {
        const roundResult = document.querySelector(".round-result");
        console.log(roundResult);
        if (roundResult) roundResult.textContent = roundResultMessage;
    }

    updateGameWinnerDisplay(winner: WarWinner) {
        const winnerDisplay = document.querySelector(".game-winner");

        if (winnerDisplay) winnerDisplay.textContent = winner.isWinner ? `${winner.name} wins!!!` : "";
    }

    checkForWinner(inAWar: boolean): WarWinner {
        const game: Game = Game.getInstance();
        const winner: WarWinner = { isWinner: false, name: "" };

        if (game.getPlayer().deck.total === 0) {
            winner.name = game.getComputer().name;
            winner.isWinner = true;
        } else if (game.getComputer().deck.total === 0) {
            winner.name = game.getPlayer().name;
            winner.isWinner = true;
        } else if (inAWar) {
            // If a player's deck is less than 4 cards when a war happens, they lose
            // because they do not have enough cards to participate
            if (game.getPlayer().deck.total < 4) {
                winner.name = game.getComputer().name;
                winner.isWinner = true;
            } else if (game.getComputer().deck.total < 4) {
                winner.name = game.getPlayer().name;
                winner.isWinner = true;
            }
        }

        return winner;
    }
}

export class Player implements WarPlayer {
    name: string;
    deck: WarDeck;

    constructor(name: string, deck: WarDeck) {
        this.name = name;
        this.deck = deck;
    }
}

export class Card implements WarCard {
    suit: "clubs" | "diamonds" | "hearts" | "spades";
    value: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
    name: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "Jack" | "Queen" | "King" | "Ace";

    constructor(
        suit: "clubs" | "diamonds" | "hearts" | "spades",
        value: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14,
        name: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "Jack" | "Queen" | "King" | "Ace"
    ) {
        this.suit = suit;
        this.value = value;
        this.name = name;
    }
}

export class Deck implements WarDeck {
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

    // Draw card from top of deck
    drawCard(): WarCard {
        // Assert that a card will be returned by shift
        const card: WarCard = this.cards.shift()!;
        this.total = this.cards.length;
        return card;
    }

    // Add won cards to bottom of deck
    addCards(...cards: WarCard[]): void {
        const newTotal = this.cards.push(...cards)
        this.total = newTotal;
    }
}