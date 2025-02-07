import { assert, test, beforeEach, describe } from "vitest";
import { Game, Deck, Player } from "../src/ts/classes";

/**
 * @jest-environment jsdom
 */
describe("Game class tests", () => {
    beforeEach(() => {
        const game = new Game();
        // Main deck is set in each test so we can easily set the cards to be drawn
        const playerDeck = new Deck([]);
        const computerDeck = new Deck([]);
        const player = new Player("test", playerDeck);
        const computer = new Player("computer", computerDeck);
        game.setPlayer(player);
        game.setComputer(computer);
    });

    test("Deal gives half the main deck to each player", () => {
        const game = Game.getInstance();
        const mainDeck = new Deck([
            { value: 2, name: "2", suit: "clubs" },
            { value: 3, name: "3", suit: "clubs" },
            { value: 4, name: "4", suit: "clubs" },
            { value: 5, name: "5", suit: "clubs" },
            { value: 6, name: "6", suit: "clubs" },
            { value: 7, name: "7", suit: "clubs" },
        ]);
        game.setMainDeck(mainDeck);
        game.deal();
        assert.strictEqual(game.getPlayer().deck.total, 3, "Player's deck should have 3 cards");
        assert.strictEqual(game.getComputer().deck.total, 3, "Computer's deck should have 3 cards");
    });

    describe("playRound tests", () => {
        test("Computer wins round and gets Player's card", () => {
            const game = Game.getInstance();
            const mainDeck = new Deck([
                { value: 2, name: "2", suit: "clubs" },
                { value: 3, name: "3", suit: "clubs" },
                { value: 4, name: "4", suit: "clubs" },
                { value: 5, name: "5", suit: "clubs" },
            ]);
            game.setMainDeck(mainDeck);
            game.deal();
            const winnings = game.getWinnings();
            game.playRound(winnings);
            assert.strictEqual(game.getComputer().deck.total, 3, "Computer should have won Player's card");
            assert.strictEqual(game.getPlayer().deck.total, 1, "Player should have lost a card");
        });

        test("Player wins round and gets Computer's card", () => {
            const game = Game.getInstance();
            const mainDeck = new Deck([
                { value: 5, name: "5", suit: "clubs" },
                { value: 3, name: "3", suit: "clubs" },
                { value: 4, name: "4", suit: "clubs" },
                { value: 2, name: "2", suit: "clubs" },
            ]);
            game.setMainDeck(mainDeck);
            game.deal();
            game.playRound(game.getWinnings());
            assert.strictEqual(game.getPlayer().deck.total, 3, "Player should have won Computer's card");
            assert.strictEqual(game.getComputer().deck.total, 1, "Computer should have lost a card");
        });

        test("War happens when Player and Computer tie", () => {
            const game = Game.getInstance();
            const mainDeck = new Deck([
                { value: 2, name: "2", suit: "clubs" },
                { value: 2, name: "2", suit: "spades" },
                { value: 4, name: "4", suit: "hearts" },
                { value: 5, name: "5", suit: "diamonds" },
                { value: 6, name: "6", suit: "clubs" },
                { value: 7, name: "7", suit: "clubs" },
                { value: 8, name: "8", suit: "spades" },
                { value: 9, name: "9", suit: "clubs" },
                { value: 10, name: "10", suit: "hearts" },
                { value: 11, name: "Jack", suit: "clubs" },
            ]);
            game.setMainDeck(mainDeck);
            game.deal();
            game.playRound(game.getWinnings());
            assert.strictEqual(game.getWinnings().length, 8, "War winnings should have 8 cards inside it");
            assert.strictEqual(game.getPlayer().deck.total, 1, "Player should only have 1 card left in deck");
            assert.strictEqual(game.getComputer().deck.total, 1, "Computer should only have 1 card left in deck");
        });
    });
});