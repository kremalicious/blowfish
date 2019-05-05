# ocean-balance

> 🐡 Simple Electron-based desktop app to retrieve and display your total Ocean Token balances.
> https://oceanprotocol.com

---

- [Usage](#usage)
- [Build packages](#build-packages)
- [Data Sources](#data-sources)

---

## Usage

Clone, add adresses, and run:

```bash
# Clone this repository
git clone git@github.com:kremalicious/ocean-balance.git
cd ocean-balance

# Add one or more Ethereum addresses to config file
vi config.js

# Install dependencies
npm install
# Run the app in dev mode
npm start
```

## Build packages

```bash
npm run build
```

Will build and package the app into platform specific packages for macOS, Windows & Linux.

On a Mac and Linux machine, packaging requires [`wine`](https://www.winehq.org) in your `PATH`. To install on macOS with [Homebrew](https://brew.sh):

```bash
brew install wine
```

## Data Sources

- balances are checked via etherscan.io API
- spot prices are fetched from coingecko.com API
