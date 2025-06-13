import './App.css';
import Header from './Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SessionsList from './SessionsList';
import ChatWindow from './ChatWindow';

function App() {
  return (
    <div className="App">
      <Container fluid>
        <Row>
        <Col sm={3}>
          <SessionsList />
        </Col>
        <Col>
          <Row>
            <Header />
          </Row>
          <Row>
            <ChatWindow />
          </Row>
        </Col>
      </Row>
      </Container>
    </div>
  );
}

export default App;
