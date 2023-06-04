import psList from 'ps-list'

const anybarPing = await psList().then(psList =>
  psList.find(({ name }) => name === 'anybar-ping')
)

const anybar = await psList().then(psList =>
  psList.find(({ name }) => name === 'AnyBar')
)

process.kill(anybarPing.pid, 'SIGINT')
process.kill(anybar.pid, 'SIGINT')
