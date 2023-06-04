import { $, execaCommand } from 'execa'
import send from 'anybar'

process.title = 'anybar-ping'

const { source, verbose, interval, timeout } = JSON.parse(process.argv[2] ?? '')

await $({
  env: {
    ANYBAR_INIT: 'hollow',
    ANYBAR_TITLE: 'anybar-ping'
  }
})`open -a AnyBar`

const subprocess = execaCommand(
  `ping ${source} -i ${interval / 1000} -W ${timeout}`
)

process.send('ACK')

const getTime = data => {
  const [, time] = data.split('time=')
  if (!time) return
  return Number(time.replace(' ms', ''))
}

const getColor = time => {
  if (time < 3000) return 'green'
  if (time < 5000) return 'orange'
  return 'red'
}

subprocess.stdout.on('data', data => {
  const info = data.toString().replace(/(\r\n|\n|\r)/gm, '')
  const time = getTime(info)
  const color = getColor(time)
  if (verbose) console.log({ info, time, color })
  send(color)
})
