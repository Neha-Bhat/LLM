import Container from "react-bootstrap/esm/Container";
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import api from './Authentication/api';

const SessionsList = ({modelName, setSessionID}) => {
    let [session, setSession] = useState([])
    // let [sessionID, setSessionID] = useState(0);
    useEffect(() => {
  const fetchHistory = async () => {
    const res = await api.get(`/${modelName}/sessionList`);
    const data = await res.data;
    setSession(data)
  };

  fetchHistory();
}, [modelName]);

    return (
        <div className="sessions-container flex flex-col">
            <button className="bg-gray-100 text-gray-700 dark:bg-gray-500 dark:text-gray-200 rounded p-2" onClick={() => {
                    setSessionID(0)
                    }}>New Session</button>
            <div>
                {
                    session.map(chat => {
                        return (
                            <div key={chat?.chatHistory[0]?.prompt} className="flex flex-col">
                                <Card style={{ width: '100%' }}>
                                    <Card.Body className="bg-gray-50 text-gray-700 dark:bg-gray-600 dark:text-gray-200 border-gray-50 dark:border-gray-600">
                                        <Card.Title onClick={() => setSessionID(chat?.sessionID)} className="cursor-pointer"><h6>{chat?.chatHistory[0]?.prompt}</h6></Card.Title>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SessionsList;