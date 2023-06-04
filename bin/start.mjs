import { $, execaCommand } from 'execa'
import send from 'anybar'

process.title = 'anybar-ping'

await $`open -a AnyBar`

const subprocess = execaCommand('ping 1.1.1.1 -i 5 -W 1000')

const getTime = data => {
  const [, time] = data.split('time=')
  if (!time) return
  return Number(time.replace(' ms', ''))
}

subprocess.stdout.on('data', data => {
  const info = data.toString().replace(/(\r\n|\n|\r)/gm, '')
  const time = getTime(info)
  if (time < 3000) send('green')
  else if (time < 1000) send('orange')
  else send('red')
})
