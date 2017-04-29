import './Suggestions.css'

const Suggestion = ({
  text,
  active,
}) => (
  <span
    className={ active ? 'suggestion active' : 'suggestion' }
  >
    { text }
  </span>
)

const Suggestions = ({
  activeIndex,
  suggestions,
}) => (
  <div>
    { suggestions.map((suggestion, i) => (
      <Suggestion
        text={ suggestion }
        active={ activeIndex === i }
      />
    )) }
  </div>
)

export default Suggestions
