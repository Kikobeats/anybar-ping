#!/usr/bin/env node

import $ from 'tinyspawn'
import send from 'anybar'

const { dns, verbose, interval, timeout, title } = JSON.parse(process.argv[2])

process.title = title

await $('open -a AnyBar', {
  env: {
    ANYBAR_INIT: 'hollow',
    ANYBAR_TITLE: title
  }
})

const subprocess = $(`ping ${dns} -i ${interval / 1000} -W ${timeout}`)

const getTime = data => {
  const [, time] = data.split('time=')
  if (!time) return
  return Number(time.replace(' ms', ''))
}

const getColor = time => (time ? (time < 300 ? 'green' : 'orange') : 'red')

subprocess.stdout.on('data', data => {
  const info = data.toString().replace(/(\r\n|\n|\r)/gm, '')
  const time = getTime(info)
  const color = getColor(time)
  if (verbose) console.log({ info, time, color })
  send(color)
})
