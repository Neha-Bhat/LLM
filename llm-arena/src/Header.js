import Dropdown from 'react-bootstrap/Dropdown';
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
                    <Dropdown.Item eventKey="Cohere">Cohere</Dropdown.Item>
                <Dropdown.Item eventKey="Gemini">Gemini</Dropdown.Item>
                {/* <Dropdown.Item href="#/action-3">Mistral</Dropdown.Item> */}
                {/* <Dropdown.Item href="#/action-3" eventKey="Stability">Stability</Dropdown.Item> */}
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}

export default Header;