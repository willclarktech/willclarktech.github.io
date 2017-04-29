import './CommandInput.css'

const CommandInput = ({
  currentInput,
  handleChange,
  handleKeyUp,
  handleKeyDown,
}) => (
  <input
    spellcheck="false"
    autofocus
    type="text"
    value={ currentInput }
    oninput={ handleChange }
    onkeyup={ handleKeyUp }
    onkeydown={ handleKeyDown }
  />
)

export default CommandInput
