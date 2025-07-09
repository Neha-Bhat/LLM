import './App.css';
import Header from './Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SessionsList from './SessionsList';
import ChatWindow from './ChatWindow';
import { useState } from 'react';

function App() {

  let [modelName, setModelName] = useState('Gemini');
  let [sessionID, setSessionID] = useState(0);
  return (
    <div className="App">
      <Container fluid>
        <Row>
        <Col sm={3}>
          <SessionsList modelName={modelName} setSessionID={setSessionID} />
        </Col>
        <Col>
          <Row>
            <Header setModelName={setModelName} modelName={modelName} />
          </Row>
          <Row>
            <ChatWindow modelName={modelName} sessionIDFromList={sessionID} />
          </Row>
        </Col>
      </Row>
      </Container>
    </div>
  );
}

export default App;
