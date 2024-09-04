import { Contract, parseUnits } from "ethers";
import { getJsonRpcProvider } from "./web3";
import SafePassKeyNFT from "./SafePassKeyNFT.json";
import {  Address, Hex, pad } from "viem";
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

import { SafeSmartAccountClient, getSmartAccountClient } from "./permissionless";
import { KernelValidator } from "@zerodev/passkey-validator";
import { ENTRYPOINT_ADDRESS_V07_TYPE } from "permissionless/types";   
import { getTokenDecimals } from "./utils";


const webAuthnModule = "0xD990393C670dCcE8b4d8F858FB98c9912dBFAa06"
const autoDCAModule = "0x679f144fCcc63c5Af7bcDb2BAda756f1bd40CE3D"
const sessionKey = "0x126B956dFB28EbBae5E792d08E791329250C8B37"



interface Transaction {
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

  const autoDCA = new Contract(
      autoDCAModule,
      AutoDCAModule.abi,
      bProvider
  )

  const sesionData = await autoDCA.sessionKeyData(sessionKey, sessionId);
  return sesionData;
}


export const getAllSessions = async (chainId: string): Promise<any> => {


  const bProvider = await getJsonRpcProvider(chainId)

  const autoDCA = new Contract(
      autoDCAModule,
      AutoDCAModule.abi,
      bProvider
  )

  const sesionData = await autoDCA.getSessionData(sessionKey);
  return sesionData;
}




export const sendTransaction = async (chainId: string, to: string, value: bigint, data: Hex, walletProvider: any, safeAccount: Hex): Promise<any> => {

    const call = { to: to as Hex, value: value, data: data }

    const key = BigInt(pad(webAuthnModule as Hex, {
        dir: "right",
        size: 24,
      }) || 0
    )


    const smartAccount = await getSmartAccountClient( { chainId, nonceKey: key, address: safeAccount, signUserOperation: walletProvider.signUserOperation, getDummySignature: walletProvider.getDummySignature, 
      validators: (await getModules( walletProvider)).validators, executors: (await getModules( walletProvider)).executors })

    return await smartAccount.sendTransaction(call);
}


export const buildAddSessionKey = async (chainId: string,  safeAccount: string, amount: bigint, fromToken: string, targetToken: string, vault: string): Promise<Transaction> => {

    
  const provider = await getJsonRpcProvider(chainId);
  const validAfter =  Math.floor(Date.now()/1000);
  const validUntil = validAfter + 300;


  amount = parseUnits(amount.toString(), await  getTokenDecimals(fromToken, provider))


  const sessionData = { vault: vault, token: fromToken, targetToken: targetToken,  account: safeAccount, validAfter: validAfter, validUntil: validUntil, limitAmount: amount, limitUsed: 0, lastUsed: 0, refreshInterval: 60 }

  const bProvider = await getJsonRpcProvider(chainId)

  const autoDCA = new Contract(
      autoDCAModule,
      AutoDCAModule.abi,
      bProvider
  )

  return {
      to: autoDCAModule,
      value: BigInt(0),
      data: (await autoDCA.addSessionKey.populateTransaction(sessionKey, sessionData)).data as Hex
  }
}




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
