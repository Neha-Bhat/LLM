import Container from "react-bootstrap/esm/Container";
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

const SessionsList = () => {
    return (
        <div className="sessions-container">
            <Container>
                <Col>
                    <Row>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>write a JS code</Card.Title>
                            </Card.Body>
                        </Card>
                    </Row>
                    <Row>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>write a JS code</Card.Title>
                            </Card.Body>
                        </Card>
                    </Row>
                    <Row>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>write a JS code</Card.Title>
                            </Card.Body>
                        </Card>
                    </Row>
                </Col>
            </Container>
        </div>
    )
}

export default SessionsList;