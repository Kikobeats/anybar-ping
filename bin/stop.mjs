import psList from 'ps-list'

const anybarPing = await psList().then(psList =>
  psList.find(({ name }) => name === 'anybar-ping')
)

const anybar = await psList().then(psList =>
  psList.find(({ name }) => name === 'AnyBar')
)

if (anybarPing?.pid) process.kill(anybarPing.pid, 'SIGINT')
if (anybar?.pid) process.kill(anybar.pid, 'SIGINT')
