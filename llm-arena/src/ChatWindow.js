// import DefaultChatWindow from "./DefaultChatWindow";
import React, { useState } from "react";

const ChatWindow = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const fetchResponse = async () => {
        setLoading(true);
        setPrompt(prompt)
        try {
            const res = await fetch('http://localhost:3100/api/gemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt})
        })
        const data = await res.json();
        setResponse(data.output || 'No result generated');
        } catch(error) {
            console.error(error)
            setResponse('Error fetching response')
        } finally {
            setLoading(false);
            setPrompt('');
        }
    }
    return (
        <div className="chat-container">
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} maxLength={500} style={{ width: '500px' }}>{prompt}</textarea>
            <button onClick={fetchResponse} disabled={loading}>{loading ? 'Thinking': 'Ask Gemini'}</button>
            <div style={{marginTop: 20}}>
                <strong>Gemini says:</strong>
                <p>{response}</p>
            </div>
        </div>
    )
}

export default ChatWindow