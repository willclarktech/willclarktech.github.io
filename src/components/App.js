import Component from 'inferno-component'
import { COMMANDS, COMMANDNAMES, FILES, FILENAMES } from '../constants'
import Terminal from './Terminal'

const scrollToBottom = () => window.scrollTo(0,
  document.body.scrollHeight
  || document.documentElement.scrollHeight
)

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentCommand: 'whoami',
      history: [],
      historyIndex: null,
      suggestions: [],
      suggestionIndex: null,
      tutorial: true,
    }

    this.getRelevantCurrentCommands = this.getRelevantCurrentCommands.bind(this)
    this.getResponse = this.getResponse.bind(this)
    this.handleEnterPress = this.handleEnterPress.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSpacePress = this.handleSpacePress.bind(this)
    this.handleTabPress = this.handleTabPress.bind(this)
    this.hideSuggestions = this.hideSuggestions.bind(this)
    this.selectNextSuggestion = this.selectNextSuggestion.bind(this)
    this.selectPreviousSuggestion = this.selectPreviousSuggestion.bind(this)
    this.showNextHistoryItem = this.showNextHistoryItem.bind(this)
    this.showPreviousHistoryItem = this.showPreviousHistoryItem.bind(this)
    this.showSuggestions = this.showSuggestions.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      currentCommand: event.target.value,
    })

    return this.state.currentCommand.length
      ? this.state.suggestions.length && this.showSuggestions()
      : this.hideSuggestions()
  }

  handleEnterPress = () => {
    return this.state.suggestions.length
      ? this.acceptSuggestion()
      : this.sendCommand()
  }

  sendCommand() {
    const { currentCommand, history } = this.state
    const commands = currentCommand.trim().split(/\s+/)
    const command = commands[0]
    const response = this.getResponse(commands)
    const newHistoryItem = {
      command: currentCommand,
      response,
    }

    const newHistory = command === 'clear'
      ? []
      : [...history, newHistoryItem]

    this.setState({
      currentCommand: '',
      history: newHistory,
      historyIndex: null,
      tutorial: false,
    })
    this.hideSuggestions()
    return scrollToBottom()
  }

  getResponse(commands) {
    const [ command ] = commands
    switch (command) {
      case 'exit':
        return window.close()
      case 'ping':
        const name = 'will'
        const domain = 'willclark'
        const tld = 'tech'
        const email = `mailto:${name}@${domain}.${tld}`
        return { text: email, link: true }
      case 'cat':
        if (commands.length !== 2) return { text: `usage: ${command} file` }
        return FILES[commands[1]] || { text: `${command}: ${commands[1]}: No such file` }
      case 'man':
        if (commands.length !== 2) return { text: `usage: ${command} command` }
        const manCommand = commands[1]
        return manCommand === 'man'
          ? { text: 'man - print this message when passed itself as an argument' }
          : { text: `No manual entry for ${manCommand}` }
      case 'cd':
      case 'clear':
      case 'echo':
      case 'git':
      case 'history':
      case 'ifconfig':
      case 'ls':
      case 'npm':
      case 'pwd':
      case 'touch':
      case 'whoami':
        const commandData = COMMANDS[command]
        const { numArgs, argName } = commandData
        if (numArgs !== undefined && commands.length !== numArgs + 1) return { text: `usage: ${command}${argName ? ` [${argName}]` : ''}` }
        return commandData
      case '':
        return null
      default:
        return { text: `${command}: command not found` }
    }
  }

  showPreviousHistoryItem() {
    const { history, historyIndex } = this.state
    const commandHistory = history.filter(i => i.command)
    const historyLength = commandHistory.length
    const newHistoryIndex = historyIndex
      ? historyIndex - 1
      : historyLength
        ? historyLength - 1
        : null

    const newCommand = newHistoryIndex === null
      ? this.state.currentCommand
      : commandHistory[newHistoryIndex].command

    this.hideSuggestions()
    return this.setState({
      historyIndex: newHistoryIndex,
      currentCommand: newCommand,
    })
  }

  showNextHistoryItem() {
    const { history, historyIndex } = this.state
    const newHistoryIndex = historyIndex && historyIndex < history.length - 1
      ? historyIndex + 1
      : null
    const newCommand = newHistoryIndex
      ? history[newHistoryIndex].command
      : ''

    this.hideSuggestions()
    return this.setState({
      historyIndex: newHistoryIndex,
      currentCommand: newCommand,
    })
  }

  handleSpacePress() {
    return this.hideSuggestions()
  }

  handleTabPress() {
    this.showSuggestions()
    return scrollToBottom()
  }

  getRelevantCurrentCommands() {
    const splitCommands = this.state.currentCommand.split(/\s+/)
    return splitCommands.slice(splitCommands.findIndex(Boolean))
  }

  showSuggestions() {
    const relevantCommands = this.getRelevantCurrentCommands()
    const commandForSuggestions = relevantCommands[relevantCommands.length - 1] || ''
    const regex = new RegExp(`^${commandForSuggestions}`, 'i')
    const suggestionSet = relevantCommands.length === 1 || relevantCommands[0] === 'man'
      ? COMMANDNAMES
      : FILENAMES
    const suggestions = suggestionSet.filter(c => c.match(regex))
    this.setState({
      suggestions,
      suggestionIndex: this.state.suggestionIndex || 0,
    })
    return scrollToBottom()
  }

  hideSuggestions() {
    return this.setState({
      suggestions: [],
      suggestionIndex: null,
    })
  }

  acceptSuggestion() {
    const { suggestions, suggestionIndex } = this.state
    const currentCommands = this.getRelevantCurrentCommands()
    const newCommands = [...currentCommands.slice(0, currentCommands.length - 1), suggestions[suggestionIndex]]
    this.setState({
      suggestionIndex: null,
      currentCommand: `${newCommands.join(' ')} `,
    })
    return this.hideSuggestions()
  }

  selectNextSuggestion() {
    const suggestionIndex = (this.state.suggestionIndex + 1) % this.state.suggestions.length
    return this.setState({
      suggestionIndex,
    })
  }

  selectPreviousSuggestion() {
    const suggestionIndex = (this.state.suggestionIndex - 1) % this.state.suggestions.length
    return this.setState({
      suggestionIndex,
    })
  }

  render() {
    const {
      currentCommand,
      history,
      suggestions,
      suggestionIndex,
      tutorial,
    } = this.state

    return (
      <Terminal
        currentCommand={ currentCommand }
        history={ history }
        suggestions={ suggestions }
        suggestionIndex={ suggestionIndex }
        handleInputChange={ this.handleInputChange }
        handleSelectNextSuggestion={ this.selectNextSuggestion }
        handleSelectPreviousSuggestion={ this.selectPreviousSuggestion }
        handleEnterPress={ this.handleEnterPress }
        handleShowNextHistoryItem={ this.showNextHistoryItem }
        handleShowPreviousHistoryItem={ this.showPreviousHistoryItem }
        handleSpacePress={ this.handleSpacePress }
        handleTabPress={ this.handleTabPress }
        tutorial={ tutorial }
      />
    )
  }
}

export default App
