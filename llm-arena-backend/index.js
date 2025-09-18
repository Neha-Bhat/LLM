const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("connected to MongoDB"))
    .catch(err => console.log(err))

const authRouter = require('./routes/auth'); // adjust path if needed
app.use('/api', authRouter);

const geminiRoute = require('./routes/gemini');
app.use('/api/gemini', geminiRoute);

const cohereRoute = require('./routes/cohere');
app.use('/api/cohere', cohereRoute);

const stabilityRoute = require('./routes/stability');
app.use('/api/stability', stabilityRoute);

app.get('/', (req, res) => {
    res.send("API is running")
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Server running on port ${PORT}`))