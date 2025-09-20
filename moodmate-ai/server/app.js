// Load environment variables from a .env file
require('dotenv').config(); 

// Import necessary modules
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Express app
const app = express();
const port = 3000;

// Middleware to enable CORS and parse JSON request bodies
app.use(cors());
app.use(express.json());

// Get your API key from environment variables.
// NOTE: For security, never hardcode your API key directly in the code.
const apiKey = process.env.GEMINI_API_KEY;

// Check if the API key is available
if (!apiKey) {
  console.error('API key is missing. Please set the GEMINI_API_KEY environment variable.');
  process.exit(1);
}

// Initialize the Google Generative AI client with your API key
const genAI = new GoogleGenerativeAI(apiKey);

// Define the API endpoint for handling chat requests
app.post('/api/generate', async (req, res) => {
  // Extract the user's prompt from the request body
  const userPrompt = req.body.prompt;
  
  // Basic validation to ensure a prompt was sent
  if (!userPrompt) {
    return res.status(400).json({ reply: 'Prompt is required.' });
  }

  try {
    // Select the "gemini-pro" model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate content based on the user's prompt
    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const text = response.text();

    // Send the generated text back as a JSON response
    res.json({ reply: text });
    
  } catch (err) {
    console.error('Error calling Gemini API:', err);
    res.status(500).json({ reply: 'Something went wrong. Please check the server logs.' });
  }
});

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
