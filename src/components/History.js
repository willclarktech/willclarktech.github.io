import Prompt from './Prompt'
import './History.css'

const Response = ({
  text,
  link,
}) => link
  ? (<a href={ text } target="_blank">{ text }</a>)
  : (<span>{ text }</span>)

const HistoryItem = ({
  command,
  response,
}) => (
  <li>
    <Prompt />{ command }
    <br />
    <Response
      { ...response }
    />
  </li>
)

const History = ({
  items,
}) => (
  <ul>
    { items.map(HistoryItem) }
  </ul>
)

export default History
