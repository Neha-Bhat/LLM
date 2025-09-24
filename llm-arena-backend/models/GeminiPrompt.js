const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    
    prompt: { type: String, required: true },
    response: { type: String, required: true },
    chatID: { type: Number, required: true, default: 0}
    
})

const geminiSchema = new mongoose.Schema({
    modelName: {type: String, default: 'Cohere'},
    customID: { type: Number, ref: 'User', required: true },
    chatHistory: [sessionSchema],
    sessionID: {type: Number, required: true, default: 0},
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.models.CoherePrompt || mongoose.model('GeminiPrompt', geminiSchema);