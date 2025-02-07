// Types
export type WarPlayer = {
    name: string;
    deck: WarDeck;
}

export type WarCard = {
    suit: "clubs" | "diamonds" | "hearts" | "spades";
    value: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
    name: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "Jack" | "Queen" | "King" | "Ace";
}

export type WarDeck = {
    cards: WarCard[];
    total: number;
    shuffle(): void;
    drawCard(): WarCard;
    addCards: (...cards) => void;
}

export type WarWinner = {
    isWinner: boolean;
    name: string;
}