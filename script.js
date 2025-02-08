document.addEventListener('DOMContentLoaded', function () {
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');

    chatbotButton.addEventListener('click', function () {
        chatbotWindow.style.display = chatbotWindow.style.display === 'block' ? 'none' : 'block';
    });

    chatbotInput.addEventListener('keypress', async function (e) {
        if (e.key === 'Enter') {
            const message = chatbotInput.value.trim();
            if (message === '') return;

            // Display user message
            chatbotMessages.innerHTML += `<div><strong>You:</strong> ${message}</div>`;
            chatbotInput.value = '';

            try {
                // Send message to FastAPI backend
                const response = await fetch('http://127.0.0.1:8000/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ message: message, session_id: "12345" })
                });

                const data = await response.json();

                // Display bot response
                chatbotMessages.innerHTML += `<div><strong>Bot:</strong> ${data.reply}</div>`;
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            } catch (error) {
                console.error('Error:', error);
                chatbotMessages.innerHTML += `<div><strong>Bot:</strong> Sorry, there was an error processing your request.</div>`;
            }
        }
    });
});
