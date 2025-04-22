let peer;
let connections = {};
let username = prompt('Enter your username:');
let host = false;

function hostGame() {
    const hostId = prompt('Enter an ID for your game room:');
    peer = new Peer(hostId);
    peer.on('open', id => {
        console.log('Hosting game with ID: ' + id);
        alert('Your game room ID is: ' + id + '. Share it with others to join.');
        peer.on('connection', connection => {
            setupConnection(connection);
        });
    });
    host = true;
}

function joinGame() {
    const hostId = prompt('Enter the game room ID to join:');
    peer = new Peer();
    peer.on('open', id => {
        const connection = peer.connect(hostId);
        setupConnection(connection);
    });
}

function setupConnection(connection) {
    connection.on('open', () => {
        console.log('Connected to: ' + connection.peer);
        connections[connection.peer] = connection;
        connection.on('data', data => {
            displayMessage('peer', data);
        });
        connection.on('close', () => {
            delete connections[connection.peer];
            console.log('Connection closed with: ' + connection.peer);
        });
    });
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;
    if (message) {
        Object.values(connections).forEach(conn => {
            if (conn.open) {
                conn.send(`${username}: ${message}`);
            }
        });
        displayMessage('you', message);
        messageInput.value = '';
    } else {
        alert('Please enter a message.');
    }
}

function displayMessage(sender, message) {
    const chat = document.getElementById('chat');
    const messageElem = document.createElement('div');
    messageElem.className = 'message ' + sender;

    const avatarElem = document.createElement('div');
    avatarElem.className = 'avatar';
    avatarElem.textContent = sender === 'you' ? username[0] : message[0];

    const contentElem = document.createElement('div');
    contentElem.className = 'content';
    contentElem.textContent = sender === 'you' ? message : message;

    messageElem.appendChild(avatarElem);
    messageElem.appendChild(contentElem);
    chat.appendChild(messageElem);
    chat.scrollTop = chat.scrollHeight;
}
document.getElementById('messageInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});