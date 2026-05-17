// server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// IMPORTANT: Keep your API key securely hidden on the server side
const HB_API_KEY = "sk_live_5ZocUZC8XeRmew_piAVWJR6pCeyiZwUWUdEFiDYGF-I";

app.post('/create-session', async (req, res) => {
    try {
        const response = await fetch("https://engine.hyperbeam.com/v0/vm", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${HB_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // Add your custom session settings here if needed
            })
        });

        const data = await response.json();
        
        // Send back the session data (includes embed_url) to the client
        res.json(data);
    } catch (error) {
        console.error("Error creating session:", error);
        res.status(500).json({ error: "Failed to initialize virtual machine." });
    }
});

app.listen(8080, () => {
    console.log('Backend server running safely on http://localhost:8080');
});
