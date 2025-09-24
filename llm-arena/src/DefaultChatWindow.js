import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

const DefaultChatWindow = () => {
    const displayMessage = [];
    const message = ['W', 'h', 'a', 't', 'c', 'a', 'n', 'I', 'h', 'e', 'l', 'p', 'y', 'o', 'u', 'w', 'i', 't', 'h', '?']
    // setInterval(() => {
    //     displayMessage.push(...message)
    //     // message.map(character => displayMessage.push(character))
    // }, 500)
    return (
        <div>
            <Container>
                <Row>
                    <h3>What can I help you with?</h3>
                </Row>
                <Row>
                    
                </Row>
            </Container>
        </div>
    )
}

export default DefaultChatWindow;