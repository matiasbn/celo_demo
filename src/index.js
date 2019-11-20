import { newKit } from '@celo/contractkit'
import Logger from './config/logger'
import './config/env'

// const kit = newKit('https://alfajores-infura.celo-testnet.org')
Logger.info(process.env.CELO_ADDRESS_1)
const kit = newKit('http://localhost:8545')
const { web3 } = kit;
(async () => {
  const balance = await web3.eth.getBalance('335192174a123c4fbfd253dfd0ba779612f63f63')
  Logger.info(web3.utils.fromWei(balance))
})()
