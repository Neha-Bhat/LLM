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
        <div className="sessions-container">
            <Row>
                <Button variant="secondary" onClick={() => {
                    setSessionID(0)
                    }}>New Session</Button>
            </Row>
            <Container>
                <Col>
                    {
                        session.map(chat => {
                            return (
                                <Row key={chat?.chatHistory[0]?.prompt}>
                        <Card style={{ width: '100%' }}>
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