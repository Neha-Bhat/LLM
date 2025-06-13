import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Header = () => {
    return (
        <div className="header">
            <DropdownButton id="dropdown-basic-button" title="Chat Bots" className='flex'>
                <Dropdown.Item href="#/action-1">Cohere</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Gemini</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Mistral</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Groq</Dropdown.Item>
            </DropdownButton>
        </div>
    )
}

export default Header;