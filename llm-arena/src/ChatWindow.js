// import DefaultChatWindow from "./DefaultChatWindow";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DefaultChatWindow from "./DefaultChatWindow";
import './ChatWindow.module.css'
import MarkdownRenderer from "./MarkdownRenderer";
import api from './Authentication/api';

const ChatWindow = ({modelName, sessionIDFromList}) => {
  useEffect(() => {
}, [sessionIDFromList]);

    const [prompt, setPrompt] = useState('');
    const [chatID, setchatID] = useState(0);
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [chats,setChats] = useState(null);
    const [sessionIDfromDB, setSessionIDfromDB] = useState(0);
    const fetchResponse = async () => {
        setLoading(true);
        setPrompt(prompt)
        try {
            const res = await api.post(`/${modelName.toLowerCase()}`, {
            body: JSON.stringify({prompt, chatID, sessionID: sessionIDFromList})
        })
        const data = res.data;
        if(modelName === 'Gemini' || modelName === 'Cohere') {
          setResponse(data.output || 'No result generated');
          setSessionIDfromDB(data.sessionID)
        }
        } catch(error) {
            console.error(error)
            setResponse('Error fetching response')
        } finally {
            setLoading(false);
            setPrompt('');
        }
    }

    const getChats = async () => {
      let sessionID;
      if(+sessionIDfromDB !== 0) sessionID = +sessionIDfromDB
      else sessionID = +sessionIDFromList;
      const res = await api.get(`/${modelName}/allChat?sessionID=${sessionID}&modelName=${modelName}`)
      const chatsFromAPI = res.data
      setChats(chatsFromAPI)
    }

    useEffect(() => {
      getChats();
    },[sessionIDFromList, response, sessionIDfromDB])

//     const [image, setImage] = useState("");

// const handleGenerate = async () => {
//   const res = await axios.post("http://localhost:3100/api/stability", {
//     prompt
//   });
//   setImage(res.data.image);
// };

//  if(modelName === 'Stability') {
//     return (
//         <div className="chat-container">
//             <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} maxLength={500} style={{ width: '500px' }}></textarea>
//             <button onClick={handleGenerate} disabled={loading}>{loading ? 'Thinking': `Ask ${modelName}`}</button>
//             {image ? (
//   <img
//     src={image}
//     alt="Generated art"
//     style={{
//       maxWidth: "512px",
//       marginTop: "16px",
//       borderRadius: "8px",
//       border: "1px solid #ccc"
//     }}
//   />
// ) : (
//   loading ? null : <p style={{ color: 'red' }}>No image generated</p>
// )}

//         </div>
//     )
//  } else {
//     return (
//         <div className="chat-container">
//           <p>{sessionIDFromList}</p>
//             <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} maxLength={500} style={{ width: '500px' }}></textarea>
//             <button onClick={fetchResponse} disabled={loading}>{loading ? 'Thinking': `Ask ${modelName}`}</button>
//             <div style={{marginTop: 20}}>
//                 <strong>`${modelName}` says:</strong>
//                 <p>{response}</p>
//             </div>
//         </div>
//     )
//  }{
  if(+sessionIDfromDB !== 0 || +sessionIDFromList !== 0) {
    return (
  <div className="chats-container ">
    {
      chats?.chatHistory?.map((chat, index) => {
        return (
          <div className="parent gap-1" key={index}>
            <div className="prompt">{chat?.prompt}</div>
            <div className="response">
              <MarkdownRenderer className='w-100' text={chat?.response} />
            </div>
          </div>
        )
      })
    }

    <div className="prompt-container">
             <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} maxLength={500} style={{ width: '500px' }}></textarea>
             <button onClick={fetchResponse} disabled={loading}>{loading ? 'Thinking': `Ask ${modelName}`}</button>
        </div>
  </div>
)
  } else {
    return (
      <div className="chat-container">
        <DefaultChatWindow />
        <div className="prompt-container">
             <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} maxLength={500} style={{ width: '500px' }}></textarea>
             <button onClick={fetchResponse} disabled={loading}>{loading ? 'Thinking': `Ask ${modelName}`}</button>
        </div>
      </div>
    )
  }



    
}

export default ChatWindow