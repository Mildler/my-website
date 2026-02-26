const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');

function sendMessage() {
    const message = chatInput.value.trim();
    if (message === '') return;

    const msgDiv = document.createElement('div');
    msgDiv.textContent = message;
    msgDiv.classList.add('message');
    chatBox.appendChild(msgDiv);

    chatInput.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
}

sendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
})