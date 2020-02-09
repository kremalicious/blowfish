const prices = new Map()
prices.set('ocean', 1)
prices.set('eur', 1)
prices.set('usd', 1)
prices.set('btc', 1)
prices.set('eth', 1)

const priceChanges = {
  eur: -14.051056318029353,
  usd: -14.051056318029268,
  btc: -14.761248039421442,
  eth: -17.538786176215627
}

export default {
  accentColor: '#0a5fff',
  accounts: [
    {
      address: '0xxxxxxxxxxxxxxxxxxx',
      balance: {
        ocean: 10000,
        btc: 1.9,
        eth: 10000,
        eur: 10000,
        usd: 10000
      }
    }
  ],
  currency: 'ocean',
  isLoading: false,
  needsConfig: false,
  prices,
  priceChanges
}
