const mongoose = require("mongoose");

const geminiSchema = new mongoose.Schema({
    model: {type: String},
    prompt: { type: String, required: true },
    response: { type: String, required: true },
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('GeminiPrompt', geminiSchema)