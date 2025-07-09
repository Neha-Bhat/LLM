const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const geminiPrompt = require('../models/GeminiPrompt');

function generateChatID() {
  const min = 10_000_000_000_000_00; // 16-digit minimum
  const max = 99_999_999_999_999_99; // 16-digit maximum
  console.log(Math.floor(Math.random() * (max - min + 1)) + min)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSessionID() {
  const min = 10_000_000; // 16-digit minimum
  const max = 99_999_999; // 16-digit maximum
  console.log(Math.floor(Math.random() * (max - min + 1)) + min)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.post('/', async (req,res) => {
    const userPrompt = req.body.prompt;
    let chatID = req.body.chatID;
    let sessionID = req.body.sessionID;
    try {
        const model = genAI.getGenerativeModel({model: "models/gemini-1.5-flash-latest"})
        const result = await model.generateContent(req.body.prompt);
        const geminiResponse = result.response.text();
        console.log(result)
        if(chatID === 0) chatID = generateChatID()
        if(sessionID === 0) sessionID = generateSessionID();
        //Save to Mongo DB
        const newPrompt = new geminiPrompt({
                    modelName: 'Gemini',
                    chatHistory: [{
                        prompt: userPrompt,
                        response: geminiResponse,
                        chatID: chatID,
                    }],
                    sessionID: sessionID,
                    createdAt: Date.now()
                })

        await newPrompt.save();
        return res.json({output: geminiResponse})
    } catch(err) {
        res.status(500).json({error: err.message})
    }
});

router.get('/sessionList', async(req, res) => {
    try {
        const sessions = await geminiPrompt.find({modelName: 'Gemini'}).sort({createdAt: -1})
        res.json(sessions)
    } catch(err) {
        res.status(500).json({error: err.message})
    }
})

module.exports = router;