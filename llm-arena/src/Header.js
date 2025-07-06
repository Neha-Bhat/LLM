import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';

const Header = ({modelName, setModelName}) => {
    // const [llm, setLlm] = useState('Gemini')
    function handleLLMSelection(eventKey) {
        // console.log(eventKey)
        setModelName(eventKey)
        console.log(modelName)
    }
    return (
        <div className="header">
            <Dropdown id="dropdown-basic-button" title="Chat Bots" className='flex' onSelect={handleLLMSelection}>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {modelName}
      </Dropdown.Toggle>
                <DropdownMenu>
                    <Dropdown.Item href="#/action-1" eventKey="Cohere">Cohere</Dropdown.Item>
                <Dropdown.Item href="#/action-2" eventKey="Gemini">Gemini</Dropdown.Item>
                {/* <Dropdown.Item href="#/action-3">Mistral</Dropdown.Item> */}
                <Dropdown.Item href="#/action-3" eventKey="Groq">Groq</Dropdown.Item>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}

export default Header;