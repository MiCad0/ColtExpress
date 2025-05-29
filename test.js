const assert = require('assert');
const { Card, ActionCard, RoundCard, Train, Wagon, Location, InsideWagon, OutsideWagon, Player } = require('./class.js');
// Language: javascript
// Dummy globals to satisfy constructors
global.defaultRoundCards = [];
global.defaultActionCards = [];

// Include the classes from class.js (assuming they are exported, otherwise, load the file in your test environment)
// For this test, we assume the classes are available in scope.

// Test suite
describe('Class Tests', function() {
    
    // should return correct id, image and position, and update position
    describe('Card Class', function() {
        
        const card = new Card('c1', 'img.png', [0, 0]);

        it('should return correct id', function() {
            assert.strictEqual(card.getId(), 'c1');
        });
        
        it('should return correct image', function() {
            assert.strictEqual(card.getImage(), 'img.png');
        });

        it('should return position', function() {
            assert.deepStrictEqual(card.getPosition(), [0, 0]);
        });

        it('should update position', function() {
            card.setPosition([1, 1]);
            assert.deepStrictEqual(card.getPosition(), [1, 1]);
        });
    });
    
    describe('ActionCard Class', function() {
        it('should store action and player', function() {
            const dummyPlayer = { name: "Test", getName: () => "Test" };
            const actionCard = new ActionCard('a1', 'action.png', [2,2], 'move', dummyPlayer);
            assert.strictEqual(actionCard.getAction(), 'move');
            assert.strictEqual(actionCard.getPlayer(), dummyPlayer);
        });
    });
    
    describe('RoundCard Class', function() {
        it('should initialize nbTurns correctly and return turns', function() {
            let turns = ['turn1', 'turn2'];
            const roundCard = new RoundCard('r1', 'round.png', [3,3], turns);
            assert.strictEqual(roundCard.getNbTurns(), turns.length);
            assert.deepStrictEqual(roundCard.getTurns(), turns);
            assert.strictEqual(roundCard.getTurn(0), 'turn1');
            assert.strictEqual(roundCard.getTurn(1), 'turn2');
        });
        
        it('should throw error on invalid turn index', function() {
            const roundCard = new RoundCard('r2', 'round.png', [0,0], ['onlyTurn']);
            assert.throws(() => roundCard.getTurn(1), /Index out of bounds/);
        });
    });
    
    describe('Train and Wagon Classes', function() {
        it('should create a train with given wagons and retrieve them correctly', function() {
            const wagon1 = new Wagon('outside1', 'inside1');
            const wagon2 = new Wagon('outside2', 'inside2');
            const train = new Train([wagon1, wagon2]);
            assert.strictEqual(train.getNbWagons(), 2);
            assert.strictEqual(train.getWagon(0), wagon1);
            assert.strictEqual(train.getWagon(1), wagon2);
            assert.throws(() => train.getWagon(2), /Index out of bounds/);
        });
    });
    
    describe('Location Classes', function() {
        it('should add and remove items from inventory in Location', function() {
            const loc = new Location('loc1', 'loc.png', [4,4]);
            loc.addToInventory('item1');
            loc.addToInventory('item2');
            assert.deepStrictEqual(loc.getInventory(), ['item1', 'item2']);
            loc.removeFromInventory('item1');
            assert.deepStrictEqual(loc.getInventory(), ['item2']);
        });
        
        it('should initialize InsideWagon inventory based on provided values', function() {
            const values = { gold: 100, silver: 50 };
            const inside = new InsideWagon('in1', 'inside.png', [5,5], values);
            // keys of 'values' should have been added to inventory during construction.
            const keys = Object.keys(values);
            assert.deepStrictEqual(inside.getInventory().sort(), keys.sort());
        });
        
        it('OutsideWagon should behave as a regular Location', function() {
            const outside = new OutsideWagon('out1', 'outside.png', [6,6]);
            outside.addToInventory('loot');
            assert.deepStrictEqual(outside.getInventory(), ['loot']);
        });
    });
    
    describe('Player Class', function() {
        it('should create player and manage hand and inventory correctly', function() {
            const player = new Player('Alice', 'red');
            // Initial hand is empty and default action cards are added as defaultActionCards (empty in our dummy)
            assert.deepStrictEqual(player.getHand(), []);
            assert.deepStrictEqual(player.getActionCards(), global.defaultActionCards);
            player.addToHand(new Card('c2', 'img2.png', [0,0]));
            assert.strictEqual(player.getHand().length, 1);
            const card = player.getHand()[0];
            player.removeFromHand(card);
            assert.strictEqual(player.getHand().length, 0);
            
            player.addToInventory('diamond');
            assert.deepStrictEqual(player.getInventory(), ['diamond']);
            player.removeFromInventory('diamond');
            assert.deepStrictEqual(player.getInventory(), []);
        });
        
        it('should shoot bullet and reduce bullet count, and add an action card', function() {
            // Create two players for bullet shoot test
            const player1 = new Player('Bob', 'blue');
            const player2 = new Player('Charlie', 'green');
            const initialBullets = player1.getBullets();
            player1.shootBullet(player2);
            assert.strictEqual(player1.getBullets(), initialBullets - 1);
            // Confirm that an ActionCard was added to player2's actionCards
            const actionCards = player2.getActionCards();
            const lastAction = actionCards[actionCards.length - 1];
            assert.strictEqual(lastAction.getId(), "bullet");
            assert.strictEqual(lastAction.getAction(), "shoot");
            assert.strictEqual(lastAction.getPlayer(), player1);
        });
        
        it('should throw an error when trying to shoot with no bullets', function() {
            const player = new Player('Dave', 'yellow');
            // Empty bullets manually for test purpose
            player.bullets = 0;
            assert.throws(() => player.shootBullet(player), /No bullets left/);
        });
    });
});
  
// To run tests, use a command like `mocha test.js` (with mocha installed)