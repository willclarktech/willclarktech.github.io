export const FILES = {
  'bphil_thesis.txt': {
    text: 'https://ora.ox.ac.uk/objects/uuid:248d2c20-261c-4fcf-8c0b-1de74822812f',
    link: true,
  },
  'CONTRIBUTING.md': {
    text: 'Ideas welcome at https://github.com/willclarktech/willclarktech.github.io/issues',
  },
}

export const FILENAMES = Object.keys(FILES)
  .sort((a, b) => a < b ? -1 : 1)

export const COMMANDS = {
  cat: {
    numArgs: 1,
    argName: 'file',
  },
  cd: {
    text: 'No CD drive found! Send me a Spotify link?',
    numArgs: 1,
    argName: 'path',
  },
  clear: {
    numArgs: 0,
  },
  echo: {
    text: 'https://twitter.com/willclarktech',
    link: true,
    numArgs: 0,
  },
  exit: {
    numArgs: 0,
  },
  ifconfig: {
    text: 'https://linkedin.com/in/willclarktech/',
    link: true,
    numArgs: 0,
  },
  git: {
    text: 'https://github.com/willclarktech',
    link: true,
    numArgs: 0,
  },
  history: {
    text: 'http://willclark.tech/cv',
    link: true,
    numArgs: 0,
  },
  ls: {
    text: FILENAMES.join(' '),
    numArgs: 0,
  },
  man: {
    numArgs: 1,
    argName: 'command',
  },
  npm: {
    text: 'https://www.npmjs.com/~willclarktech',
    link: true,
    numArgs: 0,
  },
  ping: {
    numArgs: 0,
  },
  pwd: {
    text: 'working directory :P',
    numArgs: 0,
  },
  touch: {
    text: 'https://media.giphy.com/media/vLx3t1tVQGzwA/giphy.gif',
    link: true,
  },
  whoami: {
    text: 'Will Clark -- full-stack JS developer',
    numArgs: 0,
  },
}

export const COMMANDNAMES = Object.keys(COMMANDS)
  .sort((a, b) => a < b ? -1 : 1)
