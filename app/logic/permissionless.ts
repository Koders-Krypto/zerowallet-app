import { Hex, createPublicClient, http, Chain, Transport, Address, defineChain } from 'viem'
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'
import { base, polygon, baseSepolia, sepolia } from 'viem/chains'


export const arbitrum = /*#__PURE__*/ defineChain({
  id: 42_161,
  name: 'Arbitrum',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://arb1.arbitrum.io/rpc'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Arbiscan',
      url: 'https://arbiscan.io',
      apiUrl: 'https://api.arbiscan.io/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 7654707,
    },
  },
})

import {
  ENTRYPOINT_ADDRESS_V07,
  createSmartAccountClient,
  SmartAccountClient
} from 'permissionless'
import {
  signerToSafeSmartAccount,
  SafeSmartAccount,
} from 'permissionless/accounts'
import { erc7579Actions, Erc7579Actions } from 'permissionless/actions/erc7579'
import {
  createPimlicoBundlerClient,
  createPimlicoPaymasterClient
} from 'permissionless/clients/pimlico'
import { EntryPoint, UserOperation } from 'permissionless/types'
import { publicClient } from './utils'

export type SafeSmartAccountClient = SmartAccountClient<
  EntryPoint,
  Transport,
  Chain,
  SafeSmartAccount<EntryPoint>
> &
  Erc7579Actions<EntryPoint, SafeSmartAccount<EntryPoint>>

  export const getChain = (chainId: string) : Chain => {
    return [base, polygon, arbitrum, sepolia, baseSepolia].find((chain: any) => chain.id == chainId) as Chain;
  }
  

const safe4337ModuleAddress = '0x19e52168B2e0A39a53dcB4cFDEA5850e496F873a'
const erc7569LaunchpadAddress = '0x2E1a6a9802Eb62ec52E862a6373F1E52A4F3f395'



const getPimlicoEndpoint = (chainId: string) => {
  const chain = getChain(chainId);

  return `https://api.pimlico.io/v2/${chain.name.toLowerCase().replace(/\s+/g, '-')}/rpc?apikey=${process.env.NEXT_PUBLIC_PIMLICO_API_KEY}`;
}

export const getPaymasterClient = async (chainId: string) => {
return createPimlicoPaymasterClient({
  transport: http(getPimlicoEndpoint(chainId)),
  entryPoint: ENTRYPOINT_ADDRESS_V07
})
}

export const getBundlerClient = async (chainId: string) => {
 return createPimlicoBundlerClient({
  transport: http(getPimlicoEndpoint(chainId)),
  entryPoint: ENTRYPOINT_ADDRESS_V07
})

}

interface SmartAccountClientParams {
  chainId: string;
  signer?: any;
  nonceKey?: bigint;
  address?: Hex;
  signUserOperation?: any;
  getDummySignature? : any;
  validators? : { address: Address, context: Hex}[];
  executors? : { address: Address, context: Hex}[];
}


export const getSmartAccountClient = async ( { chainId, nonceKey, signer, address, signUserOperation, getDummySignature, validators, executors  } : SmartAccountClientParams ) => {

  const chain = getChain(chainId);
  const dummySigner = privateKeyToAccount('0x47cfffe655129fa5bce61a8421eb6ea97ec6d5609b5fbea45ad68bacede19d8b')
  
  // Setting the init Safe Owner to safe4337ModuleAddress (Safe7579 adapter) address which is a contract and can't execute on Safe
  dummySigner.address = safe4337ModuleAddress as Hex

  const account = await signerToSafeSmartAccount(publicClient(parseInt(chainId)), {
    entryPoint: ENTRYPOINT_ADDRESS_V07,
    signer: dummySigner,
    address,
    nonceKey,
    safeVersion: '1.4.1',
    saltNonce: BigInt(120),
    safe4337ModuleAddress,
    erc7569LaunchpadAddress,
    validators: validators?.length ? validators : [],
    executors: executors?.length ? executors : [],
  })

  account.signUserOperation = signUserOperation ?? account.signUserOperation
  account.getDummySignature = getDummySignature ?? account.getDummySignature

  const pimlicoBundlerClient = await getBundlerClient(chainId)
  const paymasterClient = await getPaymasterClient(chainId)
  const smartAccountClient = createSmartAccountClient({
    chain,
    account,
    bundlerTransport: http(getPimlicoEndpoint(chainId)),
    middleware: {
      gasPrice: async () =>
        (await pimlicoBundlerClient.getUserOperationGasPrice()).fast,
      sponsorUserOperation: paymasterClient.sponsorUserOperation
    }
  }).extend(erc7579Actions({ entryPoint: ENTRYPOINT_ADDRESS_V07 }))

  return smartAccountClient as SafeSmartAccountClient
}


export const waitForExecution = async (chainId: string, userOperationHash: string) => {


  const pimlicoBundlerClient = await getBundlerClient(chainId)
  const receipt = await pimlicoBundlerClient.waitForUserOperationReceipt({ hash: userOperationHash as Hex, timeout: 60000})

  return receipt;

}

