const mongoose = require("mongoose");

const geminiSchema = new mongoose.Schema({
    modelName: {type: String, default: 'Gemini'},
    prompt: { type: String, required: true },
    response: { type: String, required: true },
    sessionID: { type: Number, required: true, default: 0},
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('GeminiPrompt', geminiSchema)