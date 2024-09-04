import { Contract } from "ethers";
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


const webAuthnModule = "0xD990393C670dCcE8b4d8F858FB98c9912dBFAa06"

const safe7579Module = "0x7579F9feedf32331C645828139aFF78d517d0001"
const autoDCAModule = "0x679f144fCcc63c5Af7bcDb2BAda756f1bd40CE3D"


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

export const sendTransaction = async (chainId: string, recipient: string, amount: bigint, data: Hex, walletProvider: any, safeAccount: Hex): Promise<any> => {

    const call = { to: recipient as Hex, value: amount, data: data }

    const key = BigInt(pad(webAuthnModule as Hex, {
        dir: "right",
        size: 24,
      }) || 0
    )


    const smartAccount = await getSmartAccountClient( { chainId, nonceKey: key, address: safeAccount, signUserOperation: walletProvider.signUserOperation, getDummySignature: walletProvider.getDummySignature, 
      validators: (await getModules( walletProvider)).validators, executors: (await getModules( walletProvider)).executors })

    return await smartAccount.sendTransaction(call);
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


export const addWebAuthnModule = async (safeClient: SafeSmartAccountClient, passKeyValidator: KernelValidator<ENTRYPOINT_ADDRESS_V07_TYPE>) => {


    const buildWebAuthnModule = await buildInstallModule(safeClient.chain.id, safeClient.account.address, webAuthnModule, 'validator', await passKeyValidator.getEnableData() )

    await safeClient.sendTransactions({ transactions:[{to: buildWebAuthnModule.to as Hex, value: BigInt(buildWebAuthnModule.value), data: buildWebAuthnModule.data as Hex}]})
    
}

export const installAutoDCAModules = async (safeClient: SafeSmartAccountClient, passKeyValidator: KernelValidator<ENTRYPOINT_ADDRESS_V07_TYPE>) => {


    const buildWebAuthnModule = await buildInstallModule(safeClient.chain.id, safeClient.account.address, webAuthnModule, 'validator', await passKeyValidator.getEnableData() )

    await safeClient.sendTransactions({ transactions:[{to: buildWebAuthnModule.to as Hex, value: BigInt(buildWebAuthnModule.value), data: buildWebAuthnModule.data as Hex}]})
    
}