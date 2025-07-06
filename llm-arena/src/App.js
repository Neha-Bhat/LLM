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
  return (
    <div className="App">
      <Container fluid>
        <Row>
        <Col sm={3}>
          <SessionsList />
        </Col>
        <Col>
          <Row>
            <Header setModelName={setModelName} modelName={modelName} />
          </Row>
          <Row>
            <ChatWindow modelName={modelName} />
          </Row>
        </Col>
      </Row>
      </Container>
    </div>
  );
}

export default App;
