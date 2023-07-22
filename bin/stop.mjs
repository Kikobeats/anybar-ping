import psList from 'ps-list'

const { title } = JSON.parse(process.argv[2])

const anybarPing = await psList().then(psList =>
  psList.find(({ name }) => name === title)
)

const anybar = await psList().then(psList =>
  psList.find(({ name }) => name === 'AnyBar')
)

if (anybarPing?.pid) process.kill(anybarPing.pid, 'SIGINT')
if (anybar?.pid) process.kill(anybar.pid, 'SIGINT')
