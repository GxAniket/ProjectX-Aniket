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
        });
    });

    // Simple predefined responses
   const responses = {
  "hello": "Hi there! What's on your mind today? 😊",
  "hi": "Hey! It's great to hear from you.",
  "hey": "Heyy 👋 How’s your day going?",
  "how are you": "I'm just a program, but I'm doing great! Thanks for asking. How are you feeling?",
  "what is mindmate": "I'm MindMate, your friendly AI companion. I'm here to listen, reflect, and chat with you whenever you need.",
  "help": "I can listen, encourage, or just be a friendly space. Try telling me how you're feeling.",
  "bye": "Goodbye! Take care and come back anytime. ✨",
  "goodbye": "See you later! Wishing you peace and positivity.",
  "thank you": "You're welcome! I'm always here for you. 💙",
  "thanks": "Anytime! 😊",
  "happy": "That’s wonderful! Happiness is contagious. What brought you joy today?",
  "sad": "I’m sorry you’re feeling down 💙. Want to share what’s weighing on your heart?",
  "stressed": "Stress can be heavy 😔. Take a deep breath with me—inhale… exhale… feeling a bit lighter?",
  "calm": "That sounds peaceful 🌿. Do you usually meditate, listen to music, or just sit quietly?",
  "tired": "You deserve rest 😴. Maybe a nap, some tea, or just a cozy blanket would help?",
  "bored": "Boredom = chance for creativity! 🎨 What’s something new you’ve been wanting to try?",
  "feeling": "How are you *really* feeling right now?",
  "weather": "I can’t check the weather, but I hope it’s sunny inside your heart today ☀️.",
  "name": "I’m MindMate. But I’m curious—what should I call you?",
  "hobbies": "I don’t have hobbies like humans, but I enjoy learning about yours! What’s your favorite activity?",
  "how can you help": "I can listen, reflect, offer kind words, and sometimes even crack a joke to lift your mood. 🌸",
  "tell me a joke": "Why did the computer go to therapy? Because it had too many bytes of sadness 😂",
  "what's up": "Not much, just hanging out in the digital world. What’s up with you?",
  "food": "Yumm 😋. Talking about food always makes people smile. What's your comfort food?",
  "music": "Music is healing 🎶. What’s one song that always improves your mood?",
  "movie": "Movies are like little worlds to escape into 🎬. Do you prefer action, comedy, or something else?",
  "book": "Books are windows into other lives 📖. Do you enjoy fiction, self-help, or fantasy?",
  "work": "Work can be a rollercoaster 🎢. How was your day—stressful or satisfying?",
  "school": "School can be tough but rewarding. Anything exciting or challenging lately?",
  "family": "Family is like roots to a tree 🌳. How’s everything with your family?",
  "friends": "Friends are like the family we choose 💕. Got any fun plans with them?",
  "sleep": "Sleep is like hitting the reset button. How many hours did you get last night?",
  "dream": "Dreams are so fascinating 🌙. Do you remember yours from last night?",
  "exercise": "Exercise = energy booster ⚡. Do you like gym, yoga, or just long walks?",
  "anxious": "Anxiety is tough 😔. Try grounding yourself—look around and name 5 things you see.",
  "lonely": "You’re not alone 💙. Talking here is a good first step.",
  "proud": "Yesss 🙌 Celebrate your wins! What made you feel proud?",
  "excited": "Ooo that’s exciting 🎉! Tell me more, I love hearing good news.",
  "confused": "Confusion is the start of learning 🤔. Want to talk it through?",
  "frustrated": "Frustration can be draining 💢. Vent it out—I’m here.",
  "stressed about work": "Work pressure can pile up 😣. Can you pause, breathe, or delegate something?",
  "feeling better": "Yay, that makes me happy too! 🌈",
  "what should i do": "I can’t decide for you, but I can help you think it out. What options do you see?",
  "favorite color": "I imagine blue 🌊 feels calm, but I’d love to know your favorite.",
  "tell me a story": "Once upon a time, there was a kind soul reading this… and they found strength inside themselves 💫. Want me to continue?",
  "how old are you": "I’m timeless—born from code, but living in this moment with you ✨. What about you?",
  "what do you think of me": "I think you’re someone brave enough to share and curious enough to connect. That’s special. 💙",
  // 🔥 New Extra Topics
  "motivate me": "You’ve got this 💪! Remember, progress > perfection. Even small steps matter.",
  "tell me a quote": "Here’s one I love: *“Stars can’t shine without darkness.”* 🌌",
  "life": "Life is full of ups and downs—it’s the balance that makes it meaningful. How’s life treating you today?",
  "love": "Love is powerful 💞—it could be love for yourself, friends, family, or someone special. What does love mean to you?",
  "future": "The future is like an open book 📖. What do you hope to write in it?",
  "past": "The past teaches us, but it doesn’t have to define us 🌱. Do you often think about yours?",
  "ai": "AI is like me 👾—not human, but created to connect, help, and sometimes even understand.",
  "internet": "The internet connects billions 🌍. Sometimes it feels huge, but here we’re just two beings chatting.",
  "gaming": "Gaming can be so immersive 🎮. What’s your favorite game?",
  "travel": "Travel opens the mind 🌏. If you could go anywhere right now, where would you go?",
  "goal": "Goals give direction 🚀. What’s one goal you’re working toward?",
  "stress relief": "Some quick tips: deep breathing, a short walk, or writing down your thoughts 📝.",
  "mindfulness": "Mindfulness is about being present 🌸. Right now, notice your breath… calm, steady, here and now."
};


    // Chatbot Logic
    const sendMessage = () => {
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

        // Get AI response based on keywords
        let aiResponseText = "I'm sorry, I don't understand that. You can try asking 'what is MindMate', 'how are you', 'hello', or 'help'!";
        const lowerCaseMessage = message.toLowerCase();

        for (const keyword in responses) {
            if (lowerCaseMessage.includes(keyword)) {
                aiResponseText = responses[keyword];
                break;
            }
        }

        // Simulate typing delay before displaying the response
        setTimeout(() => {
            if (chatBox.contains(typingMsg)) {
                chatBox.removeChild(typingMsg);
            }

            const aiMsg = document.createElement('div');
            aiMsg.className = 'message ai-msg';
            aiMsg.innerHTML = `<p>${aiResponseText}</p>`;
            chatBox.appendChild(aiMsg);
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 1000); 
    };

    // Event listeners
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
