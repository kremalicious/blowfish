<h1 align="center">
  Blowfish
</h1>
<p align="center">
  <strong>🐡 Simple Electron-based desktop app to retrieve and display your total <a href="https://oceanprotocol.com">Ocean Token</a> balances.</strong>
</p>
<p align="center">
  <a href="https://travis-ci.com/kremalicious/blowfish"><img src="https://travis-ci.com/kremalicious/blowfish.svg?branch=master" /></a>
  <a href="https://codeclimate.com/github/kremalicious/blowfish/maintainability"><img src="https://api.codeclimate.com/v1/badges/beeab7902ee5307fc0a1/maintainability" /></a>
  <a href="https://codeclimate.com/github/kremalicious/blowfish/test_coverage"><img src="https://api.codeclimate.com/v1/badges/beeab7902ee5307fc0a1/test_coverage" /></a>
  <a href="https://greenkeeper.io/"><img src="https://badges.greenkeeper.io/kremalicious/blowfish.svg" /></a>
</p>

![interface](https://user-images.githubusercontent.com/90316/59041344-afe53d00-8878-11e9-83e4-a82dd0c4646b.png)

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
- [Configuration](#configuration)
- [Build packages](#build-packages)
- [Creating Releases](#creating-releases)
- [License](#license)

---

## Features

- show Ocean Token balances from a list of Ethereum account addresses
- show a total balance of all account balances
- convert those balances against multiple currencies
- re-fetches everything automatically every minute
- balances are fetched via etherscan.io API
- spot prices are fetched from coingecko.com API
- detects dark appearance setting and switches to dark theme automatically (macOS only)
- detects system accent color and uses it as primary color (macOS & Windows only)
- Touch Bar support (macOS only)
- detects system locale for number formatting
- currently highly optimized for macOS, your mileage on Windows or Linux may vary

## Download

You can download pre-built binaries for macOS, Linux, and Windows from the [Releases page](https://github.com/kremalicious/blowfish/releases).

The binaries are not code-signed so opening them on macOS will result in a warning. To be able to get around this warning:

1. Right-click on the app icon, and choose _Open_
2. In the dialog, click _Open_

Alternatively, you can [build the app on your system](#build-packages).

## Development

The main app is a React app authored with [Next.js](https://nextjs.org) in `src/renderer/` wrapped within an [Electron](https://www.electronjs.org) app defined in `src/main/`.

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

## Configuration

The app has a settings screen where you can add your account addresses.

When building the app yourself, you can configure more in the `src/config.js` file:

| Key                  | Description                                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `conversions`        | Array defining the currencies the Ocean balance is converted to. Every currency listed here will appear in the ticker buttons. |
| `refreshInterval`    | Defines the interval prices and balances are refetched.                                                                        |
| `oceanTokenContract` | Contract address of the Ocean Token. You should not change this.                                                               |

## Build packages

```bash
npm run dist
```

Will build and package the app into platform specific packages for macOS, Windows & Linux.

On a Mac and Linux machine, packaging requires [`wine`](https://www.winehq.org) in your `PATH`. To install on macOS with [Homebrew](https://brew.sh):

```bash
brew install wine
```

## Creating Releases

From a clean `master` branch, running any release task will do the following:

- bumps the project version
- creates a Git tag
- commits and pushes everything
- creates a GitHub release with commit messages as description
- adds freshly build binaries for macOS, Windows & Linux as assets to each GitHub release

You can execute the script using {major|minor|patch} as first argument to bump the version accordingly:

- To bump a patch version: `npm run release`
- To bump a minor version: `npm run release minor`
- To bump a major version: `npm run release major`

For the GitHub releases steps a GitHub personal access token, exported as `GITHUB_TOKEN` is required. [Setup](https://github.com/release-it/release-it#github-releases)

## License

```text
The MIT License (MIT)

Copyright (c) 2020 Matthias Kretschmann

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
OR OTHER DEALINGS IN THE SOFTWARE.
```
