document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const moodButtons = document.querySelectorAll('.mood-btn');

    // Mood Tracker Logic
    moodButtons.forEach(button => {
        button.addEventListener('click', () => {
            moodButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            const mood = button.dataset.mood;
            // You can add logic here to use the selected mood in your AI prompt
            // For now, it just visually indicates the selection
        });
    });

    // Chatbot Logic
    const sendMessage = async () => {
        const message = userInput.value.trim();
        if (!message) return;

        // Display user message
        const userMsg = document.createElement('div');
        userMsg.className = 'message user-msg';
        userMsg.innerHTML = `<p>${message}</p>`;
        chatBox.appendChild(userMsg);

        // Clear input and scroll
        userInput.value = '';
        chatBox.scrollTop = chatBox.scrollHeight;

        // Display "typing..." message
        const typingMsg = document.createElement('div');
        typingMsg.className = 'message ai-msg typing';
        typingMsg.innerHTML = `<p>MindMate is typing...</p>`;
        chatBox.appendChild(typingMsg);
        chatBox.scrollTop = chatBox.scrollHeight;

        try {
            // This needs to point to your back-end server
            const response = await fetch('http://localhost:3000/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const aiResponseText = data.aiResponse;

            // Remove typing message
            chatBox.removeChild(typingMsg);

            // Display AI response
            const aiMsg = document.createElement('div');
            aiMsg.className = 'message ai-msg';
            aiMsg.innerHTML = `<p>${aiResponseText}</p>`;
            chatBox.appendChild(aiMsg);

        } catch (error) {
            console.error('Error:', error);
            if (chatBox.contains(typingMsg)) {
                chatBox.removeChild(typingMsg);
            }
            const errorMsg = document.createElement('div');
            errorMsg.className = 'message ai-msg';
            errorMsg.innerHTML = `<p>Sorry, something went wrong. Please try again.</p>`;
            chatBox.appendChild(errorMsg);
        }

        chatBox.scrollTop = chatBox.scrollHeight;
    };

    // Event listeners
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});