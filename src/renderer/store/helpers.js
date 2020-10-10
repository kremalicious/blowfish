import electron from 'electron'
import Store from 'electron-store'
import Eth from 'ethjs'
import { oceanTokenContract, conversions } from '../../config'
import { abi } from '@oceanprotocol/contracts/artifacts/ERC20.json'

export async function convertPrices(data, prices) {
  let newPrices = new Map(prices) // make a shallow copy of the Map
  conversions.map((key) => newPrices.set(key, data['ocean-protocol'][key])) // modify the copy

  const newPriceChanges = await Object.assign(
    ...conversions.map((key) => ({
      [key]: data['ocean-protocol'][key + '_24h_change']
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

  const store = (electron.remote && new Store()) || false

  if (store && store.has('accounts')) {
    accountsPref = store.get('accounts')
    needsConfig = !accountsPref.length
  } else {
    accountsPref = []
    needsConfig = true
  }

  return { needsConfig, accountsPref }
}
