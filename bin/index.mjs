import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'
import $ from 'tinyspawn'
import mri from 'mri'

const __dirname = dirname(fileURLToPath(import.meta.url))

const flags = mri(process.argv.slice(3), {
  default: {
    verbose: false,
    interval: 5000,
    timeout: 1000,
    dns: '1.1.1.1',
    title: 'AnyBar Ping'
  }
})

const run = (command, { background = false } = {}) =>
  new Promise(resolve => {
    const subprocess = $(
      'node' + ' ' + join(__dirname, `${command}.mjs`),
      [JSON.stringify(flags)],
      {
        stdio: flags.verbose ? 'inherit' : undefined,
        detached: background
      }
    )
    background ? subprocess.once('spawn', resolve) : resolve(subprocess)
  })

const command = process.argv[2]

if (!['start', 'stop'].includes(command)) {
  console.log()
  console.log(readFileSync(join(__dirname, 'help.txt')).toString())
  process.exit()
}

await run(command, { background: !flags.verbose })
process.exit()
