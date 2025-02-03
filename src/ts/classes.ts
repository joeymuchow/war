import { WarGame, WarPlayer, WarDeck, WarCard } from "./types.js";

// Classes
export class Game implements WarGame {
    static _instance: WarGame;
    player: WarPlayer;
    computer: WarPlayer;
    mainDeck: WarDeck;

    constructor(player: WarPlayer, computer: WarPlayer, mainDeck: WarDeck) {
        if (Game._instance) {
            return Game._instance;
        }

        this.player = player;
        this.computer = computer;
        this.mainDeck = mainDeck;

        Game._instance = this;
    }

    static getInstance(): Game {
        return Game._instance;
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