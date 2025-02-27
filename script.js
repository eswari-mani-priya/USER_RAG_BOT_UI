const API_URL = "https://user-rag-bot.onrender.com/chat"; // Replace with your actual API URL

async function sendMessage() {
    const userInput = document.getElementById("userInput").value.trim();
    if (!userInput) return;

    appendMessage("user-message", userInput);
    document.getElementById("userInput").value = "";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userInput })
        });

        const data = await response.json();
        appendMessage("bot-message", data.response || "No response from bot.");
    } catch (error) {
        appendMessage("bot-message", "⚠️ Error connecting to chatbot.");
    }
}

function appendMessage(className, text) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", className);
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
}
