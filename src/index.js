import { newKit } from '@celo/contractkit'
import Logger from './config/logger'
import './config/env'

const { NODE_ENV, ALFAJORES_URL, LOCAL_URL } = process.env
const kit = newKit(NODE_ENV === 'production' ? ALFAJORES_URL : LOCAL_URL)
const { web3 } = kit;
(async () => {
  const balance = await web3.eth.getBalance(process.env.CELO_ADDRESS_1)
  Logger.info(web3.utils.fromWei(balance))
})()
