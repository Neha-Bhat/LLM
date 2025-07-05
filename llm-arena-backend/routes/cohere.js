const express = require("express");
const router = express.Router();
const cohere = require('cohere-ai');
require('dotenv').config();
cohere.init(process.env.COHERE_API_KEY); // Store key in .env
const coherePrompt = require('../models/CoherePrompt');

router.post('/', async (req,res) => {
    const userPrompt = req.body.prompt;
    try {
        const result = await cohere.generate({model: "command-r", prompt: prompt, max_tokens: 300, temperature: 0.7})
        const cohereResponse = result.body.generations[0].text;

        //Save to Mongo DB
        const newPrompt = new coherePrompt({
            prompt: userPrompt,
            response: cohereResponse,
            createdAt: Date.now()
        })

        await newPrompt.save();
        return res.json({output: cohereResponse})
    } catch(err) {
        res.status(500).json({error: err.message})
    }
});

module.exports = router;
