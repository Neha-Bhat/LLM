const express = require("express");
const router = express.Router();
const {CohereClient} = require('cohere-ai');
require('dotenv').config();
const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY
})
const coherePrompt = require('../models/CoherePrompt');

router.post('/', async (req,res) => {
    const userPrompt = req.body.prompt;
    try {
        const result = await cohere.chat({model: "command-r", message: userPrompt, max_tokens: 300, temperature: 0.7})
        console.log(result)
        const cohereResponse = result.text;

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
