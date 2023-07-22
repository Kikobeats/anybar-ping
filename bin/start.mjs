import { $, execaCommand } from 'execa'
import send from 'anybar'

const { dns, verbose, interval, timeout, title } = JSON.parse(process.argv[2])

process.title = title

await $({
  env: {
    ANYBAR_INIT: 'hollow',
    ANYBAR_TITLE: title
  }
})`open -a AnyBar`

const subprocess = execaCommand(
  `ping ${dns} -i ${interval / 1000} -W ${timeout}`
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
