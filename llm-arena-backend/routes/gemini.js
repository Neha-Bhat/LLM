const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/', async (req,res) => {
    try {
        const model = genAI.getGenerativeModel({model: "models/gemini-1.5-flash-latest"})
        const result = await model.generateContent(req.body.prompt);
        res.json({output: result.response.text()});
    } catch(err) {
        res.status(500).json({error: err.message})
    }
});

module.exports = router;