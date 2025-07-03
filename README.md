# 🧠 LLM Arena — GenAI Playground Web App

A full-stack web application that lets users interact with multiple LLMs (Large Language Models) using a unified UI. Built with React (frontend) and Node.js + Express (backend), the app integrates popular GenAI APIs and stores user interactions in MongoDB.

## ✨ Features

- 🔌 **Multi-Model Support** — Plug-and-play integration for:
  - Gemini (`gemini-1.5-flash-latest`)
  - Cohere
  - Mistral
  - Groq
- 💬 **Prompt-Response Chat UI**
  - Users can submit prompts dynamically
  - Instant LLM-generated responses
- 🗂️ **Session-Based Chat (Upcoming)**
  - Maintain context for each model
  - View past prompt-response history
- 🛠️ **MongoDB Persistence**
  - Stores prompts, responses, timestamps, and model info
- 🌐 **API Key Management**
  - Secured via `.env` configuration

## 🔧 Tech Stack

| Layer       | Technology         |
|------------|--------------------|
| Frontend   | React              |
| Backend    | Node.js, Express   |
| Database   | MongoDB (Mongoose) |
| AI Models  | Gemini, Groq, Cohere, Mistral |
| Deployment | (Upcoming)         |

## 📦 Folder Structure

/llm-arena → React frontend
/llm-arena-backend
├── /routes → Model routers (e.g., gemini.js)
├── /models → Mongoose schemas
└── index.js → Express server setup


## 📌 How to Use

1. Clone the repo  
2. Set up your `.env` in `/llm-arena-backend`:

GEMINI_API_KEY=your_key
MONGODB_URI=your_connection_string

3. Run backend:

cd llm-arena-backend
npm install
node index.js

4. Run frontend:

cd client
npm install
npm start

🚀 Planned Features
 Cohere, Mistral, Groq integration

 Session-based chat for each model

 Chat history display

 UI polish (tabs, loaders, bubbles)

 Vercel/Render deployment

👩‍💻 Built By
Neha Gururaj
Frontend Developer | Exploring GenAI | Career Switch Aspirant
