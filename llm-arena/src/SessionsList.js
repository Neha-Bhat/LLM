import Container from "react-bootstrap/esm/Container";
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from "react";

const SessionsList = ({modelName, setSessionID}) => {
    let [session, setSession] = useState([])
    // let [sessionID, setSessionID] = useState(0);
    useEffect(() => {
  const fetchHistory = async () => {
    const res = await fetch(`http://localhost:3100/api/${modelName}/sessionList`);
    const data = await res.json();
    setSession(data)
  };

  fetchHistory();
}, [modelName]);

    return (
        <div className="sessions-container">
            <Row>
                <button onClick={() => {
                    setSessionID(0)
                    }}>New Session</button>
            </Row>
            <Container>
                <Col>
                    {
                        session.map(chat => {
                            return (
                                <Row key={chat?.chatHistory[0]?.prompt}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title onClick={() => setSessionID(chat?.sessionID)}>{chat?.chatHistory[0]?.prompt}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Row>
                            )
                        })
                    }
                    
                </Col>
            </Container>
        </div>
    )
}

export default SessionsList;