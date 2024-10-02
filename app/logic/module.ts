import { Contract, formatUnits, Interface, parseUnits } from "ethers";
import { getJsonRpcProvider } from "./web3";
import TokenVault from "./TokenVault.json";
import {  Address, Hex, SendTransactionParameters, pad } from "viem";
import {
    getClient,
    getModule,
    getAccount,
    installModule,
    isModuleInstalled,
    ModuleType,
  } from "@rhinestone/module-sdk";
import { NetworkUtil } from "./networks";
import AutoDCAModule from "./AutoDCASessionModule.json";
import OFT from "./OFT.json";

import { SafeSmartAccountClient, getSmartAccountClient } from "./permissionless";
import { buildTransferToken, getRedeemBalance, getTokenDecimals, getVaultBalance, getVaultRedeemBalance } from "./utils";
import { getDetails } from "./jobsAPI";


const webAuthnModule = "0xD990393C670dCcE8b4d8F858FB98c9912dBFAa06"
// const autoDCAModule = "0x679f144fCcc63c5Af7bcDb2BAda756f1bd40CE3D"
const autoDCAModule = "0xBdE994684051A3caDa9b90Ede0b44A06A9FAC863"
// const sessionKey = "0x3A38A4611F911523efe3cF42eBCE8fA3912b6e8e"



export interface Transaction {
  to: Hex;
  value: bigint;
  data: Hex;
}

export const getModules = async (validator: any) => {

  const validators = [{ address: validator.address,
     context: await validator.getEnableData()}, 
     { address: autoDCAModule,
      context: '0x' as Hex}]

    const executors = 
      [
     { address: autoDCAModule as Hex,
      context: '0x' as Hex}]

      return { validators, executors }
}

export const getSessionData = async (chainId: string, sessionId: string): Promise<any> => {


  const bProvider = await getJsonRpcProvider(chainId)
  const  { address} = await getDetails()

  console.log(address)

  const autoDCA = new Contract(
      autoDCAModule,
      AutoDCAModule.abi,
      bProvider
  )

  const sesionData = await autoDCA.sessionKeyData(address, sessionId);
  return sesionData;
}


export const getAllSessions = async (chainId: string): Promise<any> => {


  const bProvider = await getJsonRpcProvider(chainId)
  const  { address } = await getDetails()
  console.log(address)


  const autoDCA = new Contract(
      autoDCAModule,
      AutoDCAModule.abi,
      bProvider
  )

  const sesionData = await autoDCA.getSessionData(address);
  return sesionData;
}




export const sendTransaction = async (chainId: string, calls: Transaction[], walletProvider: any, safeAccount: Hex): Promise<any> => {

    // const call = { to: to as Hex, value: value, data: data }

    const key = BigInt(pad(webAuthnModule as Hex, {
        dir: "right",
        size: 24,
      }) || 0
    )


    const smartAccount = await getSmartAccountClient( { chainId, nonceKey: key, address: safeAccount, signUserOperation: walletProvider.signUserOperation, getDummySignature: walletProvider.getDummySignature, 
      validators: (await getModules( walletProvider)).validators, executors: (await getModules( walletProvider)).executors })

      console.log(smartAccount)
    return await smartAccount.sendTransactions({ transactions: calls, account: smartAccount.account!});
}


export const buildVaultRedeem = async (chainId: string,  safeAccount: string, vault: Hex): Promise<Transaction> => {

    
  const provider = await getJsonRpcProvider(chainId);

  const vaultContract = new Contract(
      vault,
      TokenVault,
      provider
  )

  const vaultBalance = await getVaultRedeemBalance(vault, safeAccount, provider)

  return {
      to: vault,
      value: BigInt(0),
      data: (await vaultContract.redeem.populateTransaction(vaultBalance, safeAccount, safeAccount)).data as Hex
  }
}

export const buildTokenBridge = async (chainId: string,  safeAccount: string, oftAddress: Hex, _sendParam: any, _fee: any): Promise<Transaction> => {

    
  const provider = await getJsonRpcProvider(chainId);

  const oftContract = new Contract(
      oftAddress,
      OFT,
      provider
  )

  return {
      to: oftAddress,
      value: _fee.nativeFee,
      data: (await oftContract.send.populateTransaction(_sendParam, _fee, safeAccount)).data as Hex
  }
}

export const buildAddSessionKey = async (chainId: string,  safeAccount: string, amount: string, validAfter: number, validUntil: number, refreshInterval: number, fromToken: string, targetToken: string, vault: string): Promise<Transaction> => {

    
  const provider = await getJsonRpcProvider(chainId);
  const  { address } = await getDetails()

  const parsedAmount = parseUnits(amount, await  getTokenDecimals(fromToken, provider))

  const sessionData = { vault: vault, token: fromToken, targetToken: targetToken,  account: safeAccount, validAfter: validAfter, validUntil: validUntil, limitAmount: parsedAmount, limitUsed: 0, lastUsed: 0, refreshInterval: refreshInterval }

  const autoDCA = new Contract(
      autoDCAModule,
      AutoDCAModule.abi,
      provider
  )

  return {
      to: autoDCAModule,
      value: BigInt(0),
      data: (await autoDCA.addSessionKey.populateTransaction(address, sessionData)).data as Hex
  }
}


export const buildScheduleData = async (chainId: string,  sessionId: string, fromToken: string, amount: string): Promise<Transaction> => {

    
  const provider = await getJsonRpcProvider(chainId);
  const  { address } = await getDetails()

  console.log(address)

  const parsedAmount = parseUnits(amount, await  getTokenDecimals(fromToken, provider))


    const data = await buildTransferToken(fromToken, address, parsedAmount, provider);
                const abi = [
        'function execute(address sessionKey, uint256 sessionId, address to, uint256 value, bytes calldata data) external',
      ]

    const execCallData = new Interface(abi).encodeFunctionData('execute', [ address, parseInt(sessionId), fromToken, BigInt(0), data])


  return {
      to: autoDCAModule,
      value: BigInt(0),
      data: execCallData as Hex
  }
}



//     const call = { to: autoDCAModule as Hex, value: 0n, data: execCallData as Hex }




const buildInstallModule = async (chainId: number, safeAccount: Address, address: Address, type: ModuleType, initData: Hex): Promise<any> => {


    const client = getClient({ rpcUrl: NetworkUtil.getNetworkById(chainId)?.url!});

    // Create the account object
    const account = getAccount({
            address: safeAccount,
            type: "safe",
        });


    const accountModule = getModule({
        module: address,
        initData: initData,
        type:  type,
      });

    const executions = await installModule({
        client,
        account,
        module: accountModule,
      });


      return {to: executions[0].target, value: executions[0].value.toString() , data: executions[0].callData}

}



export const isInstalled = async (chainId: number, safeAddress: Address, address: Address, type: ModuleType): Promise<boolean> => {



    const client = getClient({ rpcUrl: NetworkUtil.getNetworkById(chainId)?.url!});


    // Create the account object
    const account = getAccount({
            address: safeAddress,
            type: "safe",
        });


    const accountModule = getModule({
        module: address,
        initData: '0x',
        type:  type ,
      });

     
    try {  
    return await isModuleInstalled({
        client,
        account,
        module: accountModule,
      });
    }
    catch {
        return false;
    }

}


// export const addWebAuthnModule = async (safeClient: SafeSmartAccountClient, passKeyValidator: KernelValidator<ENTRYPOINT_ADDRESS_V07_TYPE>) => {


//     const buildWebAuthnModule = await buildInstallModule(safeClient.chain.id, safeClient.account.address, webAuthnModule, 'validator', await passKeyValidator.getEnableData() )

//     await safeClient.sendTransactions({ transactions:[{to: buildWebAuthnModule.to as Hex, value: BigInt(buildWebAuthnModule.value), data: buildWebAuthnModule.data as Hex}]})
    
// }
