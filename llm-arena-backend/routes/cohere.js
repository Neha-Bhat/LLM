const express = require("express");
const router = express.Router();
const { CohereClientV2 } = require('cohere-ai');
require('dotenv').config();
const cohere = new CohereClientV2({
    token: process.env.COHERE_API_KEY
})
const coherePrompt = require('../models/CoherePrompt');
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

    const userPrompt = {
        role: 'user',
        content: data.prompt,
      }
    let chatID = data.chatID;
    let sessionID = data.sessionID;
    try {
        const result = await cohere.chat({model: "command-a-03-2025", messages: [userPrompt], max_tokens: 500, temperature: 0.7})
        const cohereResponse = result.message.content[0].text;
        if(chatID === 0) chatID = generateChatID()
        if(sessionID === 0) {
            sessionID = generateSessionID();
            //Save to Mongo DB
            const newPrompt = new coherePrompt({
                modelName: 'Cohere',
                chatHistory: [{
                    prompt: userPrompt.content,
                    response: cohereResponse,
                    chatID: chatID,
                }],
                customID: req.user.user.customID,
                sessionID,
                createdAt: Date.now()
            })

            await newPrompt.save();
        } else {
            await coherePrompt.findOneAndUpdate(
                { sessionID: sessionID },
                {
                    $push: {
                        chatHistory: {
                        prompt: userPrompt.content,
                        response:cohereResponse,
                        chatID: chatID
                    }
                    }
                }
            )
        }
        return res.json({output: cohereResponse, sessionID})
    } catch(err) {
        res.status(500).json({error: err.message})
    }
});

router.get('/sessionList', async(req, res) => {
    try {
        const sessions = await coherePrompt.find({modelName: 'Cohere', customID: req.user.user.customID}).sort({createdAt: -1})
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
        const resp = await coherePrompt.findOne({sessionID, modelName, customID: req.user.user.customID})
        res.json(resp)
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
})

module.exports = router;
