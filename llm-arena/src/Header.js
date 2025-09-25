import Dropdown from 'react-bootstrap/Dropdown';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import { useTheme } from './Hooks/useTheme';

const Header = ({modelName, setModelName}) => {
    const {theme, setTheme} = useTheme();
    // const [llm, setLlm] = useState('Gemini')
    function handleLLMSelection(eventKey) {
        // console.log(eventKey)
        setModelName(eventKey)
        console.log(modelName)
    }
    return (
        <div className="flex justify-content-between bg-gray-50 dark:bg-gray-600 p-3 rounded">
            <Dropdown id="dropdown-basic-button" title="Chat Bots" className='flex' onSelect={handleLLMSelection}>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {modelName}
      </Dropdown.Toggle>
                <DropdownMenu>
                    <Dropdown.Item eventKey="Cohere">Cohere</Dropdown.Item>
                <Dropdown.Item eventKey="Gemini">Gemini</Dropdown.Item>
                {/* <Dropdown.Item href="#/action-3">Mistral</Dropdown.Item> */}
                {/* <Dropdown.Item href="#/action-3" eventKey="Stability">Stability</Dropdown.Item> */}
                </DropdownMenu>
            </Dropdown>
            <div className='px-2 bg-gray-400 rounded flex justify-content-center align-items-center cursor-pointer dark:bg-gray-800 dark:text-white'>
                <i className={`bi ${theme === 'dark' ? 'bi-sun' : 'bi-moon-stars'}`} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}></i>
            </div>
        </div>
    )
}

export default Header;