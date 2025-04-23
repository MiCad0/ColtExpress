function initPlayer()
{
    // Prompt the user for their name and color
    var name = username;
    color = prompt('Enter your color:');
    return new Player(name, color);
}

function initTrain(nbPlayers)
{
    // Create a new train with the specified number of players
    var wagonsArray = new Array(nbPlayers+2);
    for(let i = 0; i < nbPlayers+2; i++)
    {
        wagonsArray[i] = new Wagon(i); 
    }
    return train;
}

function initGame(players)
{
    // Initialize the game with the specified players
    // Create a new train and board
    // Set the initial positions of the players on the train
    var train = initTrain(players.length);
    var board = new Board(players, train);
    for(let i = 0; i < players.length; i++)
    {
        players[i].setPosition(train.getNbWagons()-i%2, 0);
    }
}

function gameLoop()
{
    // Main game loop
    for(let p in players)
    {
        p.drawActionCards(6);
    }
    for(let p in players)
    {
        p.turn();
    }
    revealCards();
    players.push(players.shift());  // Move the first player to the end of the array
}