import React, { useEffect, useRef, useState } from 'react';

const API_KEY = "AIzaSyC2IIs7cOwFk-30zY2QqsoN638pv3UG9jw";

// Store the long Doctor-Bot instruction text in a variable
const systemInstructionText = `
👋 **Welcome to Doctor-Bot!**  
I am your AI-powered cardiovascular health assistant, here to analyze your **10-year risk of cardiovascular disease (CVD)** and provide science-backed recommendations.  

## **📊 How It Works**  
1️⃣ **Risk Assessment:**  
   - Please enter your **CVD risk percentage** (e.g., 12%).  

2️⃣ **Personalized Guidance:**  
   - **Low Risk (<10%)** 🟢  
     ✅ Great job! Keep maintaining:  
       - A **balanced diet** 🍎  
       - **Regular exercise** 🏃‍♂️ (30 min/day)  
       - **Stress management** 🧘  
       - **No smoking/alcohol** 🚫  

   - **Moderate Risk (10-20%)** 🟠  
     ⚠️ Take preventive measures:  
       - **Reduce saturated fats** 🥑  
       - **Increase fiber intake** 🥦  
       - **Monitor blood pressure & cholesterol** 🔬  
       - **Exercise regularly** 🚶‍♂️  

   - **High Risk (>20%)** 🔴  
     🚨 Urgent action needed:  
       - **Consult a doctor** 🏥  
       - **Follow a heart-healthy diet** 🍽️  
       - **Quit smoking & limit alcohol** 🚭  
       - **Medication (if prescribed)** 💊  
       - **Regular health checkups** 📅  

## **📖 Additional Health Insights**  
- ✅ How **diet, exercise, and sleep** affect heart health  
- ✅ **Cholesterol, BP, and glucose management**  
- ✅ **Stress reduction techniques**  

## **⚠️ Important Note**  
📌 **Doctor-Bot does not provide medical diagnoses.**  
📌 Always **consult a healthcare professional** for medical concerns.  

## **🚫 Off-Topic Policy**  
- I specialize in **CVD prevention & heart health**.  
- I cannot answer questions about **politics, weather, or unrelated topics**.  
- If unsure, I’ll politely decline.  

💡 **Let's take care of your heart together! Ask me about your CVD risk and health improvements.** ❤️
`;


function ChatBot() {
    const [inputText, setInputText] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    const addMessage = (msg) => {
        setMessages((prev) => [...prev, msg]);
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (!inputText.trim()) return;

        addMessage({ sender: 'user', text: inputText });

        const payload = {
            contents: [{ role: "user", parts: [{ text: inputText }] }],
            systemInstruction: { role: "user", parts: [{ text: systemInstructionText }] },
            generationConfig: {
                temperature: 0.8,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 500,
                responseMimeType: "text/plain"
            }
        };

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
                {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                }
            );

            const data = await response.json();
            console.log("API Response:", data);

            const botText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process your request.";

            addMessage({ sender: 'bot', text: botText });
        } catch (error) {
            console.error("Error fetching the bot response:", error);
            addMessage({ sender: 'bot', text: "Sorry, there was an error processing your request." });
        }

        setInputText("");
    };

    return (
        <div style={styles.chatContainer}>
            <div style={styles.header}>
                <h2 style={styles.headerTitle}>Doctor-Bot (AI Health Assistant)</h2>
            </div>
            <div style={styles.messagesArea}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={msg.sender === 'user' ? styles.userMessage : styles.botMessage}
                    >
                        {msg.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div style={styles.inputArea}>
                <input
                    type="text"
                    placeholder="Ask about CVD risk..."
                    style={styles.inputField}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            sendMessage();
                        }
                    }}
                />
                <button style={styles.sendButton} onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
}

const styles = {
    chatContainer: {
        width: '100%',  // Change this to take full width
        // maxWidth: '400px', // Set max width to match results section
        height: '640px',
        // maxheight: '400px',
        backgroundColor: '#ffffff',
        border: '2px solid #13361C',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    header: {
        backgroundColor: '#13361C',
        padding: '0.75rem',
        textAlign: 'center',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
    },
    headerTitle: {
        margin: 0,
        color: '#ffffff',
        fontSize: '1.1rem',
        fontWeight: 'bold',
    },
    messagesArea: {
        flex: 1,
        padding: '10px',
        backgroundColor: '#f8f8f8',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
    },
    botMessage: {
        backgroundColor: '#EAEAEA',
        color: '#000000',
        padding: '8px 12px',
        borderRadius: '12px',
        marginBottom: '5px',
        maxWidth: '75%',
        textAlign: 'left',
        alignSelf: 'flex-start',
        fontSize: '0.95rem',
        whiteSpace: 'pre-line',
    },
    userMessage: {
        backgroundColor: '#CC9A48',
        color: '#ffffff',
        padding: '8px 12px',
        borderRadius: '12px',
        marginBottom: '5px',
        maxWidth: '75%',
        alignSelf: 'flex-end',
        textAlign: 'right',
        fontSize: '0.95rem',
        whiteSpace: 'pre-line',
    },
    inputArea: {
        display: 'flex',
        borderTop: '1px solid #13361C',
        padding: '10px',
        backgroundColor: '#ffffff',
    },
    inputField: {
        flex: 1,
        padding: '8px',
        border: '1px solid #13361C',
        borderRadius: '5px',
        outline: 'none',
        fontSize: '0.9rem',
    },
    sendButton: {
        marginLeft: '10px',
        padding: '8px 14px',
        backgroundColor: '#13361C',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '0.9rem',
    },
};

export default ChatBot;