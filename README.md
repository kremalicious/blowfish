<h1 align="center">
  Blowfish
</h1>
<p align="center">
  <strong>🐡 Simple Electron-based desktop app to retrieve and display your total <a href="https://oceanprotocol.com">Ocean Token</a> balances.</strong>
</p>
<p align="center">
  <a href="https://travis-ci.com/kremalicious/blowfish"><img src="https://travis-ci.com/kremalicious/blowfish.svg?branch=master" /></a>
  <a href="https://greenkeeper.io/"><img src="https://badges.greenkeeper.io/kremalicious/blowfish.svg" /></a>
</p>

![interface](https://user-images.githubusercontent.com/90316/57982435-f0098a80-7a45-11e9-96c0-903830c8d42a.png)

<p align="center">
  Made with ♥ by <a href="https://matthiaskretschmann.com">Matthias Kretschmann</a>
</p>
<p align="center">
  <small>Say thanks with OCEAN or ETH: <code>0xf50F267b5689b005FE107cfdb34619f24c014457</code></small>
  <br />
  <small>Say thanks with BTC: <code>3DiHNMt875UWa2j73qFpr3cVB9foFhYArc</code></small>
</p>

---

- [Features](#features)
- [Download](#download)
- [Development](#development)
- [Build packages](#build-packages)
- [License](#license)

---

## Features

- show Ocean Token balances from a list of Ethereum account addresses
- show a total balance of all account balances
- convert those balances against multiple currencies
- re-fetches everything automatically every minute
- balances are fetched via etherscan.io API
- spot prices are fetched from coingecko.com API
- currently highly optimized for macOS, your mileage on Windows or Linux may vary

## Download

You can download pre-built binaries for macOS, Linux, and Windows from the [Releases page](https://github.com/kremalicious/blowfish/releases).

The binaries are not code-signed so opening them on macOS will result in a warning. To be able to get around this warning:

1. Right-click on the app icon, and choose _Open_
2. In the dialog, click _Open_

Alternatively, you can [build the app on your system](#build-packages).

## Development

Clone, and run:

```bash
# Clone this repository
git clone git@github.com:kremalicious/blowfish.git
cd blowfish

# Install dependencies
npm install
# Run the app in dev mode
npm start
```

## Build packages

```bash
npm run dist
```

Will build and package the app into platform specific packages for macOS, Windows & Linux.

On a Mac and Linux machine, packaging requires [`wine`](https://www.winehq.org) and `rpm` in your `PATH`. To install on macOS with [Homebrew](https://brew.sh):

```bash
brew install wine rpm
```

## License

[The MIT License](./LICENSE)
