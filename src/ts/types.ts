// Types
export type WarGame = {
    player: WarPlayer;
    computer: WarPlayer;
    mainDeck: WarDeck;
    deal: () => void;
}

export type WarPlayer = {
    name: string;
    deck: WarDeck;
}

export type WarCard = {
    suit: "clubs" | "diamonds" | "hearts" | "spades";
    value: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
    name: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A";
}

export type WarDeck = {
    cards: WarCard[];
    total: number;
    shuffle(): void;
    drawCard(): WarCard;
    addCards: (...cards) => void;
}