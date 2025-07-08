// import DefaultChatWindow from "./DefaultChatWindow";
import React, { useState } from "react";
import axios from "axios";

const ChatWindow = ({modelName}) => {
    const [prompt, setPrompt] = useState('');
    const [sessionID, setSessionID] = useState(0);
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    console.log(modelName)
    const fetchResponse = async () => {
        setLoading(true);
        setPrompt(prompt)
        try {
            const res = await fetch(`http://localhost:3100/api/${modelName.toLowerCase()}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt, sessionID})
        })
        const data = await res.json();
        if(modelName === 'Gemini' || modelName === 'Cohere')setResponse(data.output || 'No result generated');
        } catch(error) {
            console.error(error)
            setResponse('Error fetching response')
        } finally {
            setLoading(false);
            setPrompt('');
        }
    }

    const [image, setImage] = useState("");

const handleGenerate = async () => {
  const res = await axios.post("http://localhost:3100/api/stability", {
    prompt
  });
  console.log(res)
  setImage(res.data.image);
};

 if(modelName === 'Stability') {
    return (
        <div className="chat-container">
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} maxLength={500} style={{ width: '500px' }}></textarea>
            <button onClick={handleGenerate} disabled={loading}>{loading ? 'Thinking': `Ask ${modelName}`}</button>
            {image ? (
  <img
    src={image}
    alt="Generated art"
    style={{
      maxWidth: "512px",
      marginTop: "16px",
      borderRadius: "8px",
      border: "1px solid #ccc"
    }}
  />
) : (
  loading ? null : <p style={{ color: 'red' }}>No image generated</p>
)}

        </div>
    )
 } else {
    return (
        <div className="chat-container">
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} maxLength={500} style={{ width: '500px' }}></textarea>
            <button onClick={fetchResponse} disabled={loading}>{loading ? 'Thinking': `Ask ${modelName}`}</button>
            <div style={{marginTop: 20}}>
                <strong>`${modelName}` says:</strong>
                <p>{response}</p>
            </div>
        </div>
    )
 }

    
}

export default ChatWindow