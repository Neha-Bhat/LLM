const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const geminiPrompt = require('../models/GeminiPrompt');

router.post('/', async (req,res) => {
    const userPrompt = req.body.prompt;
    try {
        const model = genAI.getGenerativeModel({model: "models/gemini-1.5-flash-latest"})
        const result = await model.generateContent(req.body.prompt);
        const geminiResponse = result.response.text();

        //Save to Mongo DB
        const newPrompt = new geminiPrompt({
            prompt: userPrompt,
            response: geminiResponse
        })

        await newPrompt.save();
        return res.json({output: geminiResponse})
    } catch(err) {
        res.status(500).json({error: err.message})
    }
});

module.exports = router;