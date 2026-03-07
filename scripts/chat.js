const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const usernameInput = document.getElementById('username-input');
const sendButton = document.getElementById('send-button');

function getTimestamp() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
}
function sendMessage() {
    const message = chatInput.value.trim();
    const username = usernameInput.value.trim() || 'guest';
    if (message === '') return;

    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat-input');

    msgDiv.innerHTML = `
        <span class="chat-username">${username}</span>
        <span class="chat-time">${getTimestamp()}</span>
        <div class="chat-text">${message}</div>
    `;

    chatBox.appendChild(msgDiv);
    chatInput.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
}

sendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
})