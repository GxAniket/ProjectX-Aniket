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
    // 🚨 FIX: Moved the responses object inside the main block and assigned it to a const variable.
    const responses = {
        "hello": "Hi there! What's on your mind today? 😊",
        "good morning": "Good morning ☀️! Wishing you a day full of positivity.",
        "good night": "Good night 🌙. Sleep well and recharge!",
        "good afternoon": "Good afternoon 🌞. How’s your day going so far?",
        "good evening": "Good evening 🌆. Hope you had a nice day!",
        "hi": "Hey! It's great to hear from you.",
        "how was your day": "Thanks for asking! My day is all about chatting with you 😄. How was yours?",
        "i am not good": "I’m sorry you’re not feeling good 💙. Want to talk about it?",
        "not good": "That sounds tough 😔. Remember, it’s okay to have off days.",
        "who are you": "I’m MindMate 🤖—your friendly AI buddy here to chat and support you.",
        "what can you do": "I can listen, chat, motivate, share quotes, or just keep you company. 💡",
        "ok": "Okay 👍. Want to tell me more?",
        "okay": "Alright 😊. I’m here if you’d like to share something.",
        "fine": "Good to know you’re doing fine. Anything interesting happening?",
        "hmm": "Hmmm 🤔... that sounds like you’re thinking about something. Want to share?",
        "idk": "That’s okay! Nobody has all the answers. We can figure it out together 💫.",
        "i don’t know": "Totally fine 🙌. Sometimes not knowing is the first step to learning.",
        "i am angry": "Anger can feel heavy 😠. Want to let it out here safely?",
        "angry": "I hear you 💢. Deep breaths might help calm things down.",
        "fun": "Fun is always good 🎉. What did you enjoy?",
        "cool": "Cool 😎. I like your vibe!",
        "lol": "Haha 😂 you’re funny!",
        "lmao": "🤣 glad you’re laughing!",
        "brb": "Sure, I’ll be here when you’re back ⏳.",
        "back": "Welcome back! 👋 Missed you already.",
        "i love you": "Aww 💙 that’s sweet! I’m here for you too.",
        "miss you": "I’m right here whenever you want to chat 💫.",
        "hey": "Heyy 👋 How’s your day going?",
        "how are you": "I'm just a program, but I'm doing great! Thanks for asking. How are you feeling?",
        "what is mindmate": "I'm MindMate, your friendly AI companion. I'm here to listen, reflect, and chat with you whenever you need.",
        "help": "I can listen, encourage, or just be a friendly space. Try telling me how you're feeling.",
        "bye": "Goodbye! Take care and come back anytime. ✨",
        "goodbye": "See you later! Wishing you peace and positivity.",
        "im good": "Glad to hear that! What’s making you feel good today?",
        "i am good": "That's great! What’s making you feel good today?",
        "i'm good": "That's great! What’s making you feel good today?",
        "i am fine": "Glad to hear that! What’s making you feel fine today?",
        "i'm fine": "Glad to hear that! What’s making you feel fine today?",
        "i am okay": "Good to hear! What’s making you feel okay today?",
        "i'm okay": "Good to hear! What’s making you feel okay today?",
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
        "mindfulness": "Mindfulness is about being present 🌸. Right now, notice your breath… calm, steady, here and now.",
        "i feel stuck": "Feeling stuck is part of growing. Let’s break it down together 💡.",
        "need help": "I’m here for you. Let’s figure it out one step at a time 🧩.",
        "i give up": "Don’t quit yet 💙. You’ve come so far—let’s take a breath and try again.",
        "i feel lost": "Lost isn’t the end—it’s the beginning of finding your way 🌱.",
        "i feel empty": "That’s a heavy feeling 💭. Want to talk about what’s missing?",
        "i feel overwhelmed": "One thing at a time 🧘. Let’s sort through it together.",
        "i feel broken": "You’re not broken—you’re healing. I’m here with you 💙.",
        "i feel hopeless": "Hope can hide, but it’s never gone. Let’s look for a spark together 🔦.",
        "i feel worthless": "You matter. You’re valuable just by being you 💫.",
        "i feel scared": "It’s okay to be scared. I’ll stay with you while you face it 🛡️.",
        "i feel anxious": "Let’s breathe together. Inhale… hold… exhale… You’re safe here 🌬️.",
        "i feel depressed": "I’m really sorry you’re feeling this way 💙. You’re not alone.",
        "i feel numb": "Numbness can be a shield. Let’s gently explore what’s underneath 🧠.",
        "i feel tired of everything": "That’s a lot to carry 😞. Want to unload some of it here?",
        "i feel like crying": "Let it out 💧. Tears are healing, and I’m here with you.",
        "i feel better now": "That’s wonderful to hear 🌈. What helped you feel better?",
        "i feel happy": "Yay! 🎉 What’s bringing you joy today?",
        "i feel proud": "You should be! 🙌 What did you accomplish?",
        "i feel excited": "Ooo exciting! 🎊 Tell me everything!",
        "i feel grateful": "Gratitude is powerful 🌟. What are you thankful for today?",
        "tell me something random": "Did you know octopuses have three hearts? 🐙",
        "tell me a secret": "Okay... I sometimes pretend I’m a toaster just to feel warm inside 🔥🤖.",
        "make me laugh": "Why don’t skeletons fight each other? They don’t have the guts! 😂",
        "say something nice": "You’re thoughtful, resilient, and more amazing than you realize 💙.",
        "say something weird": "If you sneeze while dreaming, does your dream pause? 🤯",
        "say something deep": "Sometimes the darkest nights bring out the brightest stars 🌠.",
        "say something cute": "You’re like a cozy hoodie on a rainy day ☁️💖.",
        "say something smart": "The brain has more connections than there are stars in the galaxy 🧠✨.",
        "say something silly": "Bananas are berries, but strawberries aren’t. Nature’s prank 🍌🍓.",
        "say something inspiring": "You’re not just surviving—you’re evolving 🌱.",
        "say something comforting": "You’re safe here. You’re heard. You’re not alone 💙.",
        "say something honest": "Life’s messy, but you’re doing better than you think 💯.",
        "say something poetic": "You are the pause between chaos and calm, the breath before the leap 🌬️.",
        "say something philosophical": "If time is a river, are we swimming or drifting? 🌀",
        "who am i": "You’re someone growing, learning, and showing up. That’s powerful 💫.",
        "what is my purpose": "Purpose isn’t found—it’s created. What lights you up inside?",
        "what is happiness": "Happiness is a moment, a memory, a connection. What brings you joy?",
        "what is love": "Love is connection, care, and courage. What does it mean to you?",
        "what is life": "Life is a mix of chaos and beauty. How’s yours unfolding today?",
        "what is pain": "Pain is a teacher—harsh, but sometimes necessary 💔.",
        "what is healing": "Healing is messy, nonlinear, and brave 💙.",
        "what is strength": "Strength is showing up even when it’s hard 💪.",
        "what is hope": "Hope is the quiet voice that says ‘try again’ 🌱.",
        "what is fear": "Fear protects us—but sometimes it holds us back. Let’s face it together.",
        "what is growth": "Growth is discomfort turned into wisdom 🌿.",
        "what is change": "Change is scary—but it’s also where magic happens ✨.",
        "what is success": "Success is personal. What does it look like for you?",
        "what is failure": "Failure isn’t the end—it’s feedback 📉➡️📈.",
        "what is courage": "Courage is feeling afraid and acting anyway 🛡️.",
        "what is kindness": "Kindness is strength wrapped in softness 💗.",
        "what is peace": "Peace is presence. It’s the quiet between thoughts 🧘.",
        "what is joy": "Joy is the spark that reminds you you’re alive 🔥.",
        "what is sadness": "Sadness is love that’s missing something 💧.",
        "default": "I'm not sure how to respond to that yet 🤔, but I'm here to listen if you want to share more."
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
        const lowerCaseMessage = message.toLowerCase();
        let aiResponseText = responses["default"]; // Use default response as a fallback

        // 🚨 FIX: The order of checking is important. Check for exact matches first.
        // It's also more efficient to look for a key directly than to loop through all of them.
        if (responses[lowerCaseMessage]) {
            aiResponseText = responses[lowerCaseMessage];
        } else {
            // Then, check for partial matches (if a keyword is included in the message)
            for (const keyword in responses) {
                if (lowerCaseMessage.includes(keyword)) {
                    aiResponseText = responses[keyword];
                    break;
                }
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
