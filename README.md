# anybar-ping

![Last version](https://img.shields.io/github/tag/Kikobeats/anybar-ping.svg?style=flat-square)
[![NPM Status](https://img.shields.io/npm/dm/anybar-ping.svg?style=flat-square)](https://www.npmjs.org/package/anybar-ping)

> Menubar status indicator to check internet connection.

## Install

> **Note**:
> You have to install [AnyBar](https://github.com/tonsky/AnyBar) first.

```bash
$ npm install anybar-ping --global
```

## Usage

```bash
$ anybar-ping --help

Usage
  anybar <start|stop> [flags]

Flags
  --debug       Enable verbose log level [default=false].
  --interval    Wait N milliseconds between sending each packet [default=5000].
  --source      Use the following IP address as the source address in outgoing packets [default=1.1.1.1].
  --timeout     Time in milliseconds to wait for a reply for each packet sent [default=1000].

Examples
  anybar-ping start --source 8.8.8.8
  anybar-ping stop # after a while, when you don't need it more
```

## License

**anybar-ping** © [Kiko Beats](https://kikobeats.com), released under the [MIT](https://github.com/Kikobeats/anybar-ping/blob/master/LICENSE.md) License.<br>
Authored and maintained by [Kiko Beats](https://kikobeats.com) with help from [contributors](https://github.com/Kikobeats/anybar-ping/contributors).

> [kikobeats.com](https://kikobeats.com) · GitHub [Kiko Beats](https://github.com/Kikobeats) · Twitter [@Kikobeats](https://twitter.com/Kikobeats)
