function initPlayer(name, color)
{
    name = username;
    color = prompt('Enter your color:');
    return new Player(name, color);
}

function initTrain(nbPlayers)
{
    var wagonsArray = new Array(nbPlayers+2);
    for(let i = 0; i < nbPlayers+2; i++)
    {
        wagonsArray[i] = new Wagon(i); 
    }
    return train;
}

function initGame(players)
{
    var board = new Board
}