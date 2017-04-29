import CommandInput from './CommandInput'
import History from './History'
import Prompt from './Prompt'
import Suggestions from './Suggestions'

const Terminal = ({
  currentCommand,
  history,
  suggestions,
  suggestionIndex,
  tutorial,

  handleEnterPress,
  handleInputChange,
  handleSelectNextSuggestion,
  handleSelectPreviousSuggestion,
  handleShowNextHistoryItem,
  handleShowPreviousHistoryItem,
  handleSpacePress,
  handleTabPress,
}) => {
  const handleKeyUp = event => {
    switch (event.keyCode) {
      case 13: // enter
        return handleEnterPress()
      case 37: // left
        return suggestionIndex !== null && handleSelectPreviousSuggestion()
      case 38: // up
        return handleShowPreviousHistoryItem()
      case 39: // right
        return suggestionIndex !== null && handleSelectNextSuggestion()
      case 40: // down
        return handleShowNextHistoryItem()
      default:
        return null
    }
  }

  const handleKeyDown = event => {
    switch (event.keyCode) {
      case 9: // tab
        event.preventDefault()
        return handleTabPress()
      case 32: // space
        return handleSpacePress()
      default:
        return null
    }
  }

  return (
    <div>
      <div>
        Hi!
        { tutorial
          ? ' Press ENTER.'
          : ' Press TAB to see matching commands.'
        }
      </div>
      <History items={ history } />
      <Prompt />
      <CommandInput
        currentInput={ currentCommand }
        handleChange={ handleInputChange }
        handleKeyUp={ handleKeyUp }
        handleKeyDown={ handleKeyDown }
      />
      <br />
      <Suggestions
        suggestions={ suggestions }
        activeIndex={ suggestionIndex }
      />
    </div>
  )
}

export default Terminal
