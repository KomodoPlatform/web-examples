import { BIP122_MAINNET_CAIP2, BIP122_TESTNET_CAIP2 } from '@/data/Bip122Data'
import BitcoinLib from '@/lib/Bip122Lib'

export let wallet1: BitcoinLib
export let wallet2: BitcoinLib
export let bip122Wallet: BitcoinLib
export let bip122Addresses: string[]


function getPrivateKeyForPort(): string {
  const port = parseInt(window.location.port || '3001')
  const privateKeys: Record<number, string> = {
    3001: "seed 1",
    3002: "seed 2",
    3003: "chat skate bus negative cotton foster wheel amateur mad hire pilot talk",
  }

  return privateKeys[port]
}

/**
 * Utilities
 */
export async function createOrRestoreBip122Wallet() {
  const privateKey1 = getPrivateKeyForPort()

  if (privateKey1) {
    wallet1 = await BitcoinLib.init({ privateKey: privateKey1 })
    // wallet2 = await BitcoinLib.init({ privateKey: privateKey2 })
  } else {
    wallet1 = await BitcoinLib.init({})
    // Don't store private keys in local storage in a production project!
    localStorage.setItem('BITCOIN_PRIVATE_KEY_1', wallet1.getPrivateKey())
    console.log('BITCOIN_PRIVATE_KEY_1', wallet1.getPrivateKey())
  }

  const mainnetAddress = wallet1.getAddress(BIP122_MAINNET_CAIP2)

  console.log('address1', { mainnetAddress, privateKey1 }, mainnetAddress)

  bip122Wallet = wallet1
  bip122Addresses = [
    `${BIP122_MAINNET_CAIP2}:${wallet1.getAddress(BIP122_MAINNET_CAIP2)}`,
    `${BIP122_MAINNET_CAIP2}:${wallet1.getOrdinalsAddress(BIP122_MAINNET_CAIP2)}`,
    `${BIP122_TESTNET_CAIP2}:${wallet1.getAddress(BIP122_TESTNET_CAIP2)}`,
    `${BIP122_TESTNET_CAIP2}:${wallet1.getOrdinalsAddress(BIP122_TESTNET_CAIP2)}`
  ]

  return {
    bip122Wallet,
    bip122Addresses
  }
}
