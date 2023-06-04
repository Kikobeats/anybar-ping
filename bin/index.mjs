import { execaNode } from 'execa'
import { join } from 'path'

const run = command => execaNode(join(`bin/${command}.mjs`), { detached: true })

const command = process.argv[2]

switch (command) {
  case 'start':
  case 'stop':
    run(command)
    process.exit()
  default:
    throw new Error(`Command ${command} not found.`)
}
