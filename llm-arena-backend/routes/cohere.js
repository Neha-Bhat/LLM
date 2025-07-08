const express = require("express");
const router = express.Router();
const {CohereClient} = require('cohere-ai');
require('dotenv').config();
const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY
})
const coherePrompt = require('../models/CoherePrompt');

function generateSessionID() {
  const min = 10_000_000_000_000_00; // 16-digit minimum
  const max = 99_999_999_999_999_99; // 16-digit maximum
  console.log(Math.floor(Math.random() * (max - min + 1)) + min)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.post('/', async (req,res) => {
    const userPrompt = req.body.prompt;
    let sessionID = req.body.sessionID;
    try {
        const result = await cohere.chat({model: "command-r", message: userPrompt, max_tokens: 500, temperature: 0.7})
        const cohereResponse = result.text;
        if(sessionID === 0) sessionID = generateSessionID()
        //Save to Mongo DB
        const newPrompt = new coherePrompt({
            prompt: userPrompt,
            response: cohereResponse,
            modelName: 'Cohere',
            sessionID: sessionID,
            createdAt: Date.now()
        })

        await newPrompt.save();
        return res.json({output: cohereResponse})
    } catch(err) {
        res.status(500).json({error: err.message})
    }
});

router.get('/sessionList', async(req, res) => {
    try {
        const sessions = await coherePrompt.find({modelName: 'Cohere'}).sort({createdAt: -1})
        res.json(sessions)
    } catch(err) {
        res.status(500).json({error: err.message})
    }
})

module.exports = router;
