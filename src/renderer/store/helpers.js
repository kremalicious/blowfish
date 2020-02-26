import Store from 'electron-store'
import Eth from 'ethjs'
import { fetchData } from '../../utils'
import { oceanTokenContract, conversions } from '../../config'
import { abi } from '@oceanprotocol/keeper-contracts/artifacts/OceanToken.pacific.json'

export async function fetchAndSetPrices(prices) {
  const currencies = conversions.join(',')
  const json = await fetchData(
    `https://api.coingecko.com/api/v3/simple/price?ids=ocean-protocol&vs_currencies=${currencies}&include_24hr_change=true`
  )

  let newPrices = new Map(prices) // make a shallow copy of the Map
  conversions.map(key => newPrices.set(key, json['ocean-protocol'][key])) // modify the copy

  const newPriceChanges = await Object.assign(
    ...conversions.map(key => ({
      [key]: json['ocean-protocol'][key + '_24h_change']
    }))
  )

  return { newPrices, newPriceChanges }
}

export async function getBalance(account) {
  const provider = new Eth.HttpProvider(
    `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
  )
  const eth = new Eth(provider)
  const token = eth.contract(abi).at(oceanTokenContract)
  const balance = await token.balanceOf(account)

  return Eth.fromWei(balance[0], 'ether')
}

export async function getAccounts() {
  let needsConfig
  let accountsPref
  const store = process.env.NODE_ENV === 'test' ? new Store() : global.store

  if (store.has('accounts')) {
    accountsPref = store.get('accounts')
    needsConfig = !accountsPref.length
  } else {
    accountsPref = []
    needsConfig = true
  }

  return { needsConfig, accountsPref }
}
