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
    console.log("sessionList: ", modelName)
    const res = await fetch(`http://localhost:3100/api/${modelName}/sessionList`);
    const data = await res.json();
    setSession(data)
    console.log("Chat History:", data);
  };

  fetchHistory();
}, [modelName]);

    return (
        <div className="sessions-container">
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