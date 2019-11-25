import { newKit } from '@celo/contractkit'
import Logger from './config/logger'
import './config/env'

const {
  NODE_ENV,
  ALFAJORES_URL,
  LOCAL_URL,
  CELO_ADDRESS_1: celo1,
  CELO_ADDRESS_2: celo2,
} = process.env;

(async () => {
  try {
    const kit = newKit(NODE_ENV === 'production' ? ALFAJORES_URL : LOCAL_URL)
    const { web3 } = kit
    kit.defaultAccount = celo1
    // cGLD
    const goldtoken = await kit.contracts.getGoldToken()
    const goldBalance = await goldtoken.balanceOf(celo2)

    // cUSD
    const stabletoken = await kit.contracts.getStableToken()
    const usdBalance = await stabletoken.balanceOf(celo2)

    // Contracts
    const attestations = await kit.contracts.getAttestations()
    const attestationFee = await attestations.attestationFeeRequired(3)
    // const doAttestations = await attestations.request('+56942377161', 3)
    // console.log(doAttestations)
    // const oneGold = kit.web3.utils.toWei('1', 'ether')
    // const tx = await kit.sendTransaction({
    //   from: celo1,
    //   to: celo2,
    //   value: oneGold,
    // })
    // const hash = await tx.getHash()
    // const receipt = await tx.waitReceipt()
    // Logger.info(hash)
    // Logger.info(receipt)1
    Logger.info(kit.web3.utils.fromWei(attestationFee.toString(10)))
    Logger.info(web3.utils.fromWei(goldBalance.toString(10)))
    Logger.info(web3.utils.fromWei(usdBalance.toString(10)))
  } catch (error) {
    Logger.error(error)
  }
})()
