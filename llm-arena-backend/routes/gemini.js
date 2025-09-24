const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const geminiPrompt = require('../models/GeminiPrompt');
const authMiddleWare = require('../../llm-arena-middleware/auth');

router.use(authMiddleWare)

function generateChatID() {
  const min = 10_000_000_000_000_00; // 16-digit minimum
  const max = 99_999_999_999_999_99; // 16-digit maximum
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSessionID() {
  const min = 10_000_000; // 16-digit minimum
  const max = 99_999_999; // 16-digit maximum
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.post('/', async (req,res) => {
    let data;
    if(typeof req.body.body === 'string') {
        data = JSON.parse(req.body.body);
    } else {
        data = req.body;
    }
    const userPrompt = data.prompt;
    let chatID = data.chatID;
    let sessionID = data.sessionID;
    try {
        const model = genAI.getGenerativeModel({model: "models/gemini-1.5-flash-latest"})
        const result = await model.generateContent(userPrompt);
        const geminiResponse = result.response.text();
        if(chatID === 0) chatID = generateChatID()
        if(sessionID === 0) {
            sessionID = generateSessionID();
        //Save to Mongo DB
        const newPrompt = new geminiPrompt({
                    modelName: 'Gemini',
                    chatHistory: [{
                        prompt: userPrompt,
                        response: geminiResponse,
                        chatID: chatID,
                    }],
                    customID: req.user.user.customID,
                    sessionID: sessionID,
                    createdAt: Date.now()
                })

        await newPrompt.save();
        } else {
            await geminiPrompt.findOneAndUpdate(
                { sessionID: sessionID },
                {
                    $push: {
                        chatHistory: {
                        prompt: userPrompt,
                        response:geminiResponse,
                        chatID: chatID
                    }
                    }
                }
            )
        }
        return res.json({output: geminiResponse, sessionID})
    } catch(err) {
        res.status(500).json({error: err.message})
    }
});

router.get('/sessionList', async(req, res) => {
    try {
        const sessions = await geminiPrompt.find({modelName: 'Gemini', customID: req.user.user.customID}).sort({createdAt: -1})
        if(sessions.length === 0) {
            res.json([])
        }
         else res.json(sessions)
    } catch(err) {
        res.status(500).json({error: err.message})
    }
})

router.get('/allChat', async(req, res) => {
    const {sessionID, modelName} = req?.query;
    try {
        const resp = await geminiPrompt.findOne({sessionID, modelName, customID: req.user.user.customID})
        res.json(resp)
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
})


module.exports = router;