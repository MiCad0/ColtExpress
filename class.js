class Card
{
    constructor(id, image, position)
    {
        this.id = id;
        this.image = image;
        this.position = position;
    }
    getId()
    {
        return this.id;
    }
    getImage()
    {
        return this.image;
    }
    getPosition()
    {
        return this.position;
    }
    setPosition(position)
    {
        this.position = position;
    }
}

class ActionCard extends Card
{
    constructor(id, image, position, action, player)
    {
        super(id, image, position);
        this.action = action;
        this.player = player;
    }
    getAction()
    {
        return this.action;
    }
    getPlayer()
    {
        return this.player;
    }
}

class RoundCard extends Card
{
    constructor(id, image, position, turns)
    {
        super(id, image, position);
        this.nbTurns = turns.length;
        this.turns = turns;
    }
    getNbTurns()
    {
        return this.nbTurns;
    }
    getTurns()
    {
        return this.turns;
    }
    getTurn(i)
    {
        if (i < 0 || i >= this.nbTurns)
        {
            throw new Error("Index out of bounds");
        }
        return this.turns[i];
    }
}

class Train 
{
    constructor(wagons)
    {
        this.nbWagons = wagons.length;
        this.wagons = wagons;
    }
    getNbWagons()
    {
        return this.nbWagons;
    }
    getWagons()
    {
        return this.wagons;
    }
    getWagon(i)
    {
        if (i < 0 || i >= this.nbWagons)
        {
            throw new Error("Index out of bounds");
        }
        return this.wagons[i];
    }
}

class Wagon
{
    constructor(outsidem, inside)
    {
        this.outside = outsidem;
        this.inside = inside;
    }
}

class Location
{
    constructor(id, image, position)
    {
        this.id = id;
        this.image = image;
        this.position = position;
        this.inventory = [];
    }
    getId()
    {
        return this.id;
    }
    getImage()
    {
        return this.image;
    }
    getPosition()
    {
        return this.position;
    }
    getInventory()
    {
        return this.inventory;
    }
    removeFromInventory(item)
    {
        const index = this.inventory.indexOf(item);
        if (index > -1)
        {
            this.inventory.splice(index, 1);
        }
    }
    addToInventory(item)
    {
        this.inventory.push(item);
    }
}

class InsideWagon extends Location
{
    constructor(id, image, position, value)
    {
        super(id, image, position);
        this.value = value;
        for(let e in this.value)
        {
            this.inventory.push(e);
        }
    }
    getValue()
    {
        return this.value;
    }
}

class OutsideWagon extends Location
{
    constructor(id, image, position)
    {
        super(id, image, position);
    }
}

class Player
{
    static idCounter = 0;
    static getNextId()
    {
        return Player.idCounter++;
    }
    constructor(name, color)
    {
        this.id = getNextId();
        this.name = name;
        this.color = color;
        this.position = null;
        this.hand = [];
        this.inventory = [];
        this.bullets = 6;
        this.actionCards = defaultActionCards;
    }
    getId()
    {
        return this.id;
    }
    getName()
    {
        return this.name;
    }
    getColor()
    {
        return this.color;
    }
    getPosition()
    {
        return this.position;
    }
    setPosition(position)
    {
        this.position = position;
    }
    getHand()
    {
        return this.hand;
    }
    addToHand(card)
    {
        this.hand.push(card);
    }
    removeFromHand(card)
    {
        const index = this.hand.indexOf(card);
        if (index > -1)
        {
            this.hand.splice(index, 1);
        }
    }
    getInventory()
    {
        return this.inventory;
    }
    addToInventory(item)
    {
        this.inventory.push(item);
    }
    removeFromInventory(item)
    {
        const index = this.inventory.indexOf(item);
        if (index > -1)
        {
            this.inventory.splice(index, 1);
        }
    }
    getBullets()
    {
        return this.bullets;
    }
    shootBullet(player)
    {
        if (this.bullets > 0)
        {
            this.bullets--;
            player.addActionCard(new ActionCard("bullet", "placeholder.png", player.getPosition(), "shoot", this));
        }
        else
        {
            throw new Error("No bullets left");
        }
    }
    getActionCards()
    {
        return this.actionCards;
    }
    addActionCard(card)
    {
        this.actionCards.push(card);
    }
}

class Board
{
    constructor(players, train)
    {
        this.players = players;
        this.nbPlayers = players.length;
        this.roundCards = defaultRoundCards;
        this.discardedRoundCards = [];
        this.playedActionCards = [];
        this.train = train;
    }
}